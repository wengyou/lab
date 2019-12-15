import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import {Modal, Button, Input, Select, Form} from "antd";
import "../static/style/header.scss";
import * as user from "../redux/actionCreators/user";
import {checkNumber, Encrypto, isChinese, openNotification, Decrypt, onKeyDown} from "../utils/commonFunction";
import {LOG_OUT} from "../constants/actionTypes";
import StudentTable from "./StudentTable";
import SearchStudent from "./SearchStudent";
import { Table } from 'antd';
import {preserve} from "../redux/actionCreators/user";
const { Option } = Select;

let sex = "男",teacherId = "";

const Header = props => {
    const handleSexChange = val => {
        sex = val;
    };
    const handleTeacherChange = val => {
        teacherId = val;
    };
    const {
        login,
        handleLogin,
        handleRegister,
        handleTeacher,
        teacher,
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
        teacherName
    } = props;
    useEffect(() => {
        handleQueryRegister({userId: reUserId, type: reType, page: 1})
    }, []);
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
    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [identifyVisible, setIdentifyVisible] = useState(false);
    const [studentMessageVisible, setStudentMessageVisible] = useState(false);
    const [studentCertification, setStudentCertification] = useState(false);
    //身份
    const [identify, setIdentify] = useState("游客");
    useEffect(() => {
        setIdentify(userIdentify)
    },[userIdentify]);

    const [edit, toggleEdit] = useState(false);
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
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '授权状态',
            dataIndex: 'registerDate',
            key: 'registerDate',
            render: (text, data) => <span
                style={{color: "blue"}}
                onClick={() => {
                    handleRegistered({userId: data.userId})
                }}
            >
                {text}
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
                    {
                        identifyVisible && login &&
                            <>
                                <Modal
                                    keyboard
                                    title={"我的信息"}
                                    visible={identifyVisible}
                                    onCancel={() => setIdentifyVisible(!identifyVisible)}
                                    onOk={() => setIdentifyVisible(!identifyVisible)}
                                    footer={
                                        <Button
                                            type={"primary"}
                                            onClick={
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
                                        >保存</Button>
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
                                                        ref={el.ref}
                                                        disabled={!edit}
                                                        defaultValue={el.defaultMessage}
                                                        className="modifyInput"
                                                        onMouseEnter={
                                                            () => {
                                                                toggleEdit(true)
                                                                // console.log(el.ref.current.state.value)
                                                            }
                                                        }
                                                        onMouseLeave={
                                                            () => toggleEdit(false)
                                                        }
                                                        onPressEnter={
                                                            () => {
                                                                toggleEdit(false);
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
                                    title={"我的信息"}
                                    footer={null}
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
                                                            width= '760px'
                                                            visible={studentCertification}
                                                            onCancel={() => setStudentCertification(!studentCertification)}
                                                            title={"学生注册"}
                                                            footer={null}
                                                        >
                                                            <Table
                                                                style={{width: "45rem"}}
                                                                columns={columns}
                                                                dataSource={data}
                                                                pagination={{
                                                                    total,
                                                                    pageSize: 10,
                                                                    defaultCurrent: 1,
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
                                    localStorage.removeItem('access');
                                    handleLogOut();
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
                                <div className="row row-spacebetween-center">
                                    <label>账号</label><Input ref={userId} style={{width: "90%"}}/>
                                </div>
                                <div className="row row-spacebetween-center">
                                    <label htmlFor="">密码</label>
                                    <Input.Password
                                        ref={password}
                                        style={{width: "90%"}}
                                        onPressEnter={
                                            () => {
                                                handleLogin({
                                                    userId: userId.current.state.value,
                                                    password: Encrypto(password.current.input.value),
                                                });
                                            }
                                        }
                                    />
                                </div>
                                <Button
                                    style={{marginTop: "1rem"}}
                                    onClick={() => alert("你未设置密保问题，或账号错误，请联系管理员重置密码！")}
                                >
                                    忘记密码
                                </Button>
                            </Modal> : ""
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
                                                })
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
                                <Input ref={userId} style={{width: "90%"}} />
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    年级
                                </label>
                                <Input ref={grade} style={{width: "90%"}}/>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    专业
                                </label>
                                <Input ref={discipline} style={{width: "90%"}}/>
                            </div>
                            <div className="row row-spacebetween-center">
                                <div className="row row-spacebetween-center" style={{width: "50%"}}>
                                    <label htmlFor="">
                                        性别
                                    </label>
                                    <Select defaultValue="男" style={{width: "80%"}} onChange={val => handleSexChange(val)}>
                                        <Option value="男" >男</Option>
                                        <Option value="女" >女</Option>
                                    </Select>
                                </div>
                                <div className="row row-spacebetween-center" style={{width: "50%"}}>
                                    <label style={{marginLeft: "4%"}}>教师</label>
                                    <Select
                                        onSearch={
                                            value => console.log(value)
                                        }
                                        onChange={
                                            val => handleTeacherChange(val)
                                        }
                                        style={{width: "80%"}}
                                    >
                                        {
                                            teacherName.map((item,index) => <Option value={item} key={index}>{item}</Option>)
                                        }
                                    </Select>
                                </div>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    电话
                                </label>
                                <Input ref={phone} style={{width: "90%"}}/>
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
                                <Input ref={academy} style={{width: "90%"}}/>
                            </div>
                            <div className="row row-spacebetween-center">
                                <label htmlFor="">
                                    班级
                                </label>
                                <Input ref={cls} style={{width: "90%"}}/>
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
                                            })
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

export default connect(
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
        rePhone: state.getIn((["userMana", "common", "phone"])),
        rePassword: state.getIn(["userMana", "common", "password"]),
        data: state.getIn(["resource", "resource", "registerStudent"]),
        total: state.getIn(["resource", "resource", "registerTotal"]),
        teacherName: state.getIn(["resource", "resource", "teacherName"]),
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
            if (!checkNumber(args.userId)) {
                openNotification("请检查学号格式");
            } else if (!checkNumber(args.grade)) {
                openNotification("请检查年级的格式")
            } else if (!isChinese(args.discipline)) {
                openNotification("请检查专业的格式")
            } else if (!checkNumber(args.phone)) {
                openNotification("请检查电话的格式")
            } else if (!isChinese(args.userName)) {
                openNotification("请检查姓名的格式")
            } else if (!isChinese(args.academy)) {
                openNotification("请检查学院的格式")
            } else if (!checkNumber(args.cls)) {
                openNotification("请检查班级的格式")
            } else if (args.length === 0) {
                openNotification("请输入密码");
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
            dispatch(user.register(args));
        }
    })
)(Header);