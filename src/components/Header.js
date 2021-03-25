import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import {Modal, Button, Input, Select, Form, Table} from "antd";
import "../static/style/header.scss";
import * as user from "../redux/actionCreators/user";
import {checkNumber, Encrypto, isChinese, openNotification, Decrypt} from "../utils/commonFunction";
import { LOG_OUT } from "../constants/actionTypes";
import StudentTable from "./StudentTable";
import SearchStudent from "./SearchStudent";
const { Option } = Select;

let sex = "男",teacherId = "", question = "Q1";

const Header = props => {
    const [registerUserId, setRegisterUserId] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRegisterUserId([selectedRowKeys])
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    const handleSexChange = val => {
        sex = val;
    };
    const handleTeacherChange = val => {
        teacherId = val;
    };
    const handleQuestionChange = val => {
        question = val;
    }
    const {
        login,
        handleLogin,
        handleRegister,
        handleTeacher,
        reUserId,
        reGrade,
        reAcademy,
        reDiscipline,
        reClass,
        reSex,
        reType,
        rePhone,
        rePassword,
        name,
        userIdentify,
        handleLogOut,
        handlePreserve,
        data,
        handleQueryRegister,
        total,
        handleRegistered,
        teacherName,
        registerSuccess,
        registeredFlag,
        querySecret,
        secretGuardExistence,
        isQuestion,
        resetPasswardData,
        addQuestion,
        checkQuestion,
        isCheck,
        modifyPassward,
        visible
    } = props;
    useEffect(() => {
        registerSuccess ? setRegisterVisible(!registerVisible) : setRegisterVisible(registerVisible)
    }, [registerSuccess]);
    useEffect(() => {
        if (reType !== "") {
            handleQueryRegister({userId: reUserId, type: "teacher", page: 1})
        }
    }, [registeredFlag]);
    useEffect(() => {
        setResetVisible(modifyPassward)
    }, [modifyPassward])
    //注册信息
    const userId = useRef();
    const userName = useRef();
    const academy = useRef();
    const grade = useRef();
    const discipline = useRef();
    const cls = useRef();
    const phone = useRef();
    const password = useRef();
    const type = useRef();
    //学生修改信息
    const modifyUserId = useRef();
    const modifyUserName = useRef();
    const modifyAcademy = useRef();
    const modifyGrade = useRef();
    const modifyDiscipline = useRef();
    const modifyCls = useRef();
    const modifySex = useRef();
    const modifyType = useRef();
    const modifyPhone = useRef();
    const modifyPassword = useRef();
    //密保
    const questionAnswer = useRef()
    const newPassward = useRef()
    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [identifyVisible, setIdentifyVisible] = useState(false);
    const [studentMessageVisible, setStudentMessageVisible] = useState(false);
    const [studentCertification, setStudentCertification] = useState(false);
    const [resetVisible, setResetVisible] = useState(false)
    //身份
    const [identify, setIdentify] = useState("游客");
    useEffect(() => {
        setIdentify(userIdentify);
        //改这里
        userIdentify === '超级管理员' && props.history.push('/admin')
    },[userIdentify]);
    //教师批准注册用户
    const columns = [
        {
            title: '学号',
            dataIndex: 'userId',
            key: 'name',
        },
        {
            title: '学生姓名',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '年级',
            dataIndex: 'grade',
            key: 'grade',
        },
        {
            title: '学院',
            dataIndex: 'academy',
            key: 'academy',
        },
        {
            title: '专业',
            dataIndex: 'discipline',
            key: 'discipline',
        },
        {
            title: '班级',
            dataIndex: 'cls',
            key: 'cls',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'registerDate',
            key: 'registerDate',
        },
        {
            title: '授权状态',
            dataIndex: 'state',
            key: 'state',
            render: (text, data) => <span
                style={{color: "blue", cursor: "pointer"}}
                onClick={() => {
                    text === "no" &&
                    handleRegistered({
                        userId: [data.userId],
                        teacherId: reUserId,
                        type: reType,
                        page: 1
                    })
                }}
            >
                {text === "no"? text="批准":text="已批准"}
            </span>,
        },
        ];
    //我的信息
    const refs = [
        {
            ref: modifyUserId,
            defaultMessage: reUserId,
            title: "学号"
        },
        {
            ref: modifyUserName,
            defaultMessage: name,
            title: "姓名"
        },
        {
            ref: modifyAcademy,
            defaultMessage: reAcademy,
            title: "学院"
        },
        {
            ref: modifyGrade,
            defaultMessage: reGrade,
            title: "年级"
        },
        {
            ref: modifyDiscipline,
            defaultMessage: reDiscipline,
            title: "专业"
        },
        {
            ref: modifyCls,
            defaultMessage: reClass,
            title: "班级"
        },
        {
            ref: modifySex,
            defaultMessage: reSex,
            title: "性别"
        },
        {
            ref: modifyType,
            defaultMessage: reType,
            title: "类型"
        },
        {
            ref: modifyPhone,
            defaultMessage: rePhone,
            title: "电话"
        },
        {
            ref: modifyPassword,
            defaultMessage: Decrypt(rePassword),
            title: "密码"
        }
    ];
    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 16,
        },
      };
      useEffect(() => {
        setResetVisible(false);
        setLoginVisible(false)
    }, [visible])
    return (
        <>
            <header className="userHeader">
                <ul id="headerNav" className="row row-start-center">
                    {
                        login &&
                        <li onClick={() => setIdentifyVisible(!identifyVisible)}>
                            <span>您好,</span>
                            <span className="name">{name}</span>
                        </li>
                    }
                    {/* 我的信息 */}
                    {
                        identifyVisible && login &&
                            <>
                                <Modal
                                    keyboard
                                    title={"我的信息（其他信息不可改只可更改密码）"}
                                    visible={identifyVisible}
                                    onCancel={() => setIdentifyVisible(!identifyVisible)}
                                    onOk={() => setIdentifyVisible(!identifyVisible)}
                                    footer={
                                        <Button
                                            type={"primary"}
                                            onClick={
                                                () => {
                                                    setResetVisible(true);
                                                    secretGuardExistence(reUserId);
                                                    setIdentifyVisible(!identifyVisible);
                                                }
                                            }
                                        >
                                            修改密码
                                        </Button>
                                    }
                                >
                                    <Form.Item
                                        className="row row-spacebetween-center"
                                        style={{
                                            margin: 0,
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        {
                                            refs.map(el => (
                                                <div
                                                    className="row center-center"
                                                    style={{width: "30rem"}}
                                                >
                                                    <label>{el.title}</label>
                                                    <Input
                                                        disabled={true}
                                                        ref={el.ref}
                                                        defaultValue={el.defaultMessage}
                                                        className="modifyInput"
                                                        onPressEnter={
                                                            () => {
                                                                handlePreserve({
                                                                    userId: modifyUserId.current.state.value,
                                                                    userName: modifyUserName.current.state.value,
                                                                    grade: modifyGrade.current.state.value,
                                                                    academy: modifyAcademy.current.state.value,
                                                                    discipline: modifyDiscipline.current.state.value,
                                                                    cls: modifyCls.current.state.value,
                                                                    phone: modifyPhone.current.state.value,
                                                                    sex: modifySex.current.state.value,
                                                                    password: Encrypto(modifyPassword.current.state.value)
                                                                });
                                                                setIdentifyVisible(!identifyVisible);
                                                            }
                                                        }
                                                    />
                                                </div>
                                            ))
                                        }
                                    </Form.Item>
                                </Modal>
                            </>

                    }
                    <li>
                        {`身份 - ${identify}`}
                    </li>
                    {
                        login && identify === "教师" &&
                            <li
                                className="studentMessage"
                                onClick={() => setStudentMessageVisible(!studentMessageVisible)}
                            >
                                学生信息
                            </li>
                    }
                    {
                        studentMessageVisible && login &&
                            <>
                                <Modal
                                    visible={studentMessageVisible}
                                    onCancel={() => setStudentMessageVisible(!studentMessageVisible)}
                                    title={"学生信息"}
                                    footer={null}
                                    width= '60rem'
                                >
                                    <div className="studentMesWrapper">
                                        <div className="searchWrapper">
                                            <Button
                                                style={{marginRight: "0.5rem"}}
                                                onClick={
                                                    () => {
                                                        setStudentCertification(true);
                                                        handleQueryRegister({
                                                            userId: reUserId,
                                                            type: reType,
                                                            page: 1
                                                        })
                                                    }
                                                }
                                            >
                                                学生认证
                                            </Button>
                                            {
                                                studentCertification &&
                                                    <>
                                                        <Modal
                                                            width= '68rem'
                                                            visible={studentCertification}
                                                            onCancel={() => setStudentCertification(!studentCertification)}
                                                            title={"学生注册(显示的学生为：学生选择您为审核人)"}
                                                            footer={
                                                                <Button
                                                                    type={"primary"}
                                                                    onClick={ () => {
                                                                        handleRegistered({
                                                                                userId: registerUserId,
                                                                            })
                                                                        }
                                                                    }
                                                                >
                                                                    批量批准
                                                                </Button>
                                                            }
                                                        >
                                                            <Table
                                                                rowKey={record => record.userId}
                                                                rowSelection={rowSelection}
                                                                style={{width: "65rem"}}
                                                                columns={columns}
                                                                dataSource={data}
                                                                pagination={{
                                                                    total,
                                                                    pageSize: 10,
                                                                    onChange: e => {
                                                                        handleQueryRegister({
                                                                            userId: reUserId,
                                                                            type: "teacher",
                                                                            page: e
                                                                        })
                                                                    }
                                                                }}
                                                            />
                                                        </Modal>
                                                    </>
                                            }
                                            <SearchStudent style={{marginLeft: '1rem'}} />
                                        </div>
                                        <StudentTable/>
                                    </div>
                                </Modal>
                            </>
                    }
                    {/*退出*/}
                    {
                        login &&
                        <a
                            href=""
                            onClick={
                                e => {
                                    e.preventDefault();
                                    sessionStorage.removeItem('access');
                                    handleLogOut();
                                    setLoginVisible(loginVisible);
                                }
                            }
                        >
                            退出
                        </a>
                    }
                    {/*登录*/}
                    {
                        !login &&
                        <li
                            className="navItem"
                            onClick={() => setLoginVisible(!loginVisible)}
                        >
                            登录
                        </li>
                    }
                    {
                        loginVisible && !login ?
                            <Modal
                                zIndex={100}
                                visible={ loginVisible }
                                title="登录"
                                onCancel={() => setLoginVisible(!loginVisible)}
                                onOk={
                                    () => {
                                       setLoginVisible(!loginVisible)
                                    }
                                }
                                footer={
                                    <Button
                                        type={"primary"}
                                        onClick={ () => {
                                            handleLogin({
                                                userId: userId.current.state.value,
                                                password: Encrypto(password.current.input.value),
                                            });
                                        }
                                        }
                                    >
                                        登录
                                    </Button>
                                }
                            >
                                <Form
                                    {...layout}
                                    name="basic"
                                >
                                    <Form.Item
                                        label="用户名"
                                        name="username"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                        ]}
                                    >
                                        <Input ref={userId} placeholder='学生用户名为学号' />
                                    </Form.Item>

                                    <Form.Item
                                        label="密码"
                                        name="password"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        ]}
                                    >
                                        <Input.Password
                                            ref={password}
                                            onPressEnter={() => {
                                                handleLogin({
                                                    userId: userId.current.state.value,
                                                    password: Encrypto(password.current.input.value),
                                                });
                                            }}
                                            placeholder='请不要将您的密码设置为123'
                                        />
                                    </Form.Item>
                                </Form>
                                <Button
                                    style={{marginTop: "1rem"}}
                                    onClick={() => {
                                        if(userId.current.state.value) {
                                            secretGuardExistence(userId.current.state.value)
                                            setResetVisible(true)
                                        } else {
                                            openNotification('账号不能为空')
                                        }
                                    }}
                                >
                                    忘记密码
                                </Button>
                            </Modal> : ""
                    }
                    {/* 修改密码 */}
                    {
                        modifyPassward &&
                        <Modal
                            zIndex={1000}
                            destroyOnClose={true}
                            visible={ resetVisible }
                            title={ isCheck ? "修改密码" : (isQuestion ? "修改密码" : "添加密保问题")}
                            onCancel={() => setResetVisible(!resetVisible)}
                            onOk={
                                () => {
                                    setResetVisible(!resetVisible);
                                    querySecret({userId: reUserId});
                                }
                            }
                            footer={
                                <Button
                                    type={"primary"}
                                    onClick={ () => {
                                            isQuestion ? checkQuestion({
                                                'userId': userId.current.state.value || reUserId,
                                                'question': question,
                                                'answer': questionAnswer.current.state.value,
                                                'password': Encrypto(newPassward.current.state.value)

                                            }) : addQuestion({
                                                'userId': userId.current.state.value || reUserId,
                                                'question': question,
                                                'answer': questionAnswer.current.state.value
                                            })
                                        }
                                    }
                                >
                                    提交
                                </Button>
                            }
                        >
                            <div>
                                <div className="row row-spacebetween-center">
                                    <label htmlFor="">
                                        请选择密保问题:
                                    </label>
                                    <Select defaultValue="Q1" style={{width: "70%"}} onChange={val => handleQuestionChange(val)}>
                                        <Option value='Q1' >您就读的高中叫什么名字？</Option>
                                        <Option value="Q2" >您的母亲叫什么名字？</Option>
                                        <Option value="Q3" >您就读的小学叫什么名字？</Option>
                                    </Select>
                                </div>
                                <div className="row row-spacebetween-center">
                                    <label>输入密保问题答案：</label><Input ref={questionAnswer} style={{width: "70%"}}/>
                                </div>
                                {
                                    isQuestion &&
                                    <div className="row row-spacebetween-center">
                                        <label>输入你的新密码：</label><Input placeholder={'注：新密码不能为123'} ref={newPassward} style={{width: "70%"}}/>
                                    </div>
                                }
                            </div>
                        </Modal>
                    }

                    {/*注册*/}
                    {
                        !login &&
                        <li
                            className="navItem"
                            onClick={
                                () => {
                                    setRegisterVisible(!registerVisible);
                                    handleTeacher({});
                                }
                            }
                        >
                            注册
                        </li>
                    }
                    {
                        registerVisible && !login &&
                        <Modal
                            title="注册"
                            visible={registerVisible}
                            onCancel={() => setRegisterVisible(!registerVisible)}
                            footer={
                                <div className="row row-spacebetween-center">
                                    <span>提示：信息必须真实,完整,否则无效！</span>
                                    <Button
                                        type={"primary"}
                                        onClick={
                                            () => {
                                                handleRegister({
                                                    userId: userId.current.state.value,
                                                    userName: userName.current.state.value,
                                                    academy: academy.current.state.value,
                                                    grade: grade.current.state.value,
                                                    discipline: discipline.current.state.value,
                                                    cls: cls.current.state.value,
                                                    sex,
                                                    phone: phone.current.state.value,
                                                    teacherId,
                                                    password: Encrypto(password.current.input.value),
                                                });
                                            }
                                        }
                                    >
                                        注册
                                    </Button>
                                </div>
                            }
                        >
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    学号
                                </label>
                                <Input ref={userId} style={{width: "90%"}} placeholder={'例：2018211304'} />
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    年级
                                </label>
                                <Input ref={grade} style={{width: "90%"}} placeholder={'例：2018'}/>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    专业
                                </label>
                                <Input ref={discipline} style={{width: "90%"}} placeholder={'例：电子商务'}/>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    性别
                                </label>
                                <Select defaultValue="男" style={{width: "90%"}} onChange={val => handleSexChange(val)}>
                                    <Option value="男" >男</Option>
                                    <Option value="女" >女</Option>
                                </Select>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label>教师</label>
                                <Select
                                    onSearch={
                                        value => { return 0; }
                                    }
                                    onChange={
                                        val => handleTeacherChange(val)
                                    }
                                    style={{width: "90%"}}
                                    placeholder="注册后需要该教师审核通过，请选择"
                                >
                                    {
                                        teacherName.map((item,index) => <Option value={item[1]} key={index}>{item[0]}</Option>)
                                    }
                                </Select>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    电话
                                </label>
                                <Input ref={phone} style={{width: "90%"}} placeholder={'输入11位的数字'}/>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    姓名
                                </label>
                                <Input ref={userName} style={{width: "90%"}}/>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    学院
                                </label>
                                <Input ref={academy} style={{width: "90%"}} placeholder={'例：经济管理现代邮政学院'}/>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    班级
                                </label>
                                <Input ref={cls} style={{width: "90%"}} placeholder={'例：03131802'}/>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    密码
                                </label>
                                <Input.Password
                                    onPressEnter={
                                        () => {
                                            handleRegister({
                                                userId: userId.current.state.value,
                                                userName: userName.current.state.value,
                                                academy: academy.current.state.value,
                                                grade: grade.current.state.value,
                                                discipline: discipline.current.state.value,
                                                cls: cls.current.state.value,
                                                sex,
                                                phone: phone.current.state.value,
                                                teacherId,
                                                password: Encrypto(password.current.input.value),
                                            });
                                        }
                                    }
                                    ref={password}
                                    style={{width: "90%"}}
                                />
                            </div>
                        </Modal>
                    }
                    <li style={{paddingLeft: 10}}>
                        <a href="http://172.22.4.2.node6.cqupt.co/manual/html/student.html" >
                            使用手册
                        </a>
                    </li>
                </ul>
            </header>
        </>
    )
};

export default withRouter(connect(
    state => ({
        login: state.getIn(["userMana","common","login"]),
        teacher: state.getIn(["userMana", "student", "teacher"]),
        userIdentify: state.getIn(["userMana", "common", "userIdentify"]),
        name: state.getIn(["userMana", "common", "name"]),
        reAcademy: state.getIn(["userMana", "common", "academy"]),
        reDiscipline: state.getIn(["userMana", "common", "discipline"]),
        reGrade: state.getIn(["userMana", "common", "grade"]),
        reSex: state.getIn(["userMana", "common", "sex"]),
        reUserId: state.getIn(["userMana", "common", "userId"]),
        reClass: state.getIn(["userMana", "common", "class"]),
        reType: state.getIn(["userMana", "common", "type"]),
        rePhone: state.getIn(["userMana", "common", "phone"]),
        rePassword: state.getIn(["userMana", "common", "password"]),
        data: state.getIn(["userMana", "common", "registerStudent"]),
        total: state.getIn(["userMana", "common", "registerTotal"]),
        teacherName: state.getIn(["resource", "resource", "teacherName"]),
        ratify: state.getIn(["resource", "resource", "ratify"]),
        registerSuccess: state.getIn(["userMana", "common", "registerSuccess"]),
        registeredFlag: state.getIn(["userMana", "common", "registeredFlag"]),
        resetPasswardData: state.getIn(["userMana", "common", "resetPasswardData"]),
        isQuestion: state.getIn(["userMana", "common", "isQuestion"]),
        isCheck: state.getIn(["userMana", "common", "isCheck"]),
        modifyPassward: state.getIn(["userMana", "common", "modifyPassward"]),
        visible: state.getIn(["userMana", "common", "visible"]),
    }),
    dispatch => ({
        handleLogin(args) {
            if (args.length === 0) {
                openNotification("请输入密码")
            } else {
                dispatch(user.login(args));
            }
        },
        handleRegister(args) {
            if (args.userId.length === 0) {
                openNotification("请检查学号格式");
            } else if (!checkNumber(args.grade) && args.grade.length !== 4) {
                openNotification("请检查年级的格式")
            } else if (!checkNumber(args.phone) && args.phone.length !== 11) {
                openNotification("请检查电话的格式")
            } else if (!isChinese(args.academy)) {
                openNotification("请检查学院的格式")
            } else if (args.cls.length === 0) {
                openNotification("请检查班级的格式")
            } else if (args.password.length === 0) {
                openNotification("请输入密码");
            } else if (args.teacherId.length === 0) {
                openNotification("请选择老师")
            } else {
                dispatch(user.register(args));
            }
        },
        handleTeacher(){
            dispatch(user.teacher());
        },
        handleLogOut() {
            dispatch({type: LOG_OUT});
        },
        handlePreserve(args) {
            dispatch(user.preserve(args));
        },
        handleQueryRegister(args) {
            dispatch(user.queryRegister(args));
        },
        handleRegistered(args) {
            dispatch(user.registered(args));
        },
        querySecret(args) {
            dispatch(user.querySecret(args))
        },
        secretGuardExistence(args) {
            dispatch(user.secretGuardExistence(args))
        },
        checkQuestion(args) {
            dispatch(user.checkQuestion(args))
        },
        addQuestion(args) {
            dispatch(user.addQuestion(args))
        }
    })
)(Header));
