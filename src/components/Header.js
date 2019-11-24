import React, {useRef, useState} from "react";
import { connect } from "react-redux";
import {Modal, Button, Input, Select} from "antd";
import "../static/style/header.scss";
import * as user from "../redux/actionCreators/user";
import {checkNumber, Encrypto, isChinese, openNotification} from "../utils/commonFunction";

const { Option } = Select;
const teacher = [
    "zsz",
    "wd",
    "ml"
];
let sex = "男",teacherId = "";

const Header = props => {
    const handleSexChange = val => {
        sex = val;
    };
    const handleTeacherChange = val => {
        teacherId = val;
    };
    const { handleLogin } = props;
    const { handleRegister } = props;
    const userId = useRef();
    const userName = useRef();
    const academy = useRef();
    const grade = useRef();
    const discipline = useRef();
    const cls = useRef();
    const phone = useRef();
    const password = useRef();
    let identify = "游客";
    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);
    return (
        <>
            <header>
                <ul id="headerNav" className="row row-start-center">
                    <li>身份-{identify}</li>
                    {/*登录*/}
                    <li
                        className="navItem"
                        onClick={() => setLoginVisible(!loginVisible)}
                    >
                        登录
                    </li>
                    {
                        loginVisible &&
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
                                            })
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
                                    <label htmlFor="">密码</label><Input.Password ref={password} style={{width: "90%"}}/>
                                </div>
                                <Button style={{marginTop: "1rem"}}>忘记密码</Button>
                            </Modal>
                    }
                    {/*注册*/}
                    <li
                        className="navItem"
                        onClick={() => setRegisterVisible(!registerVisible)}>注册</li>
                    {
                        registerVisible &&
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
                                    <Select onChange={val => handleTeacherChange(val)} defaultValue="张盛泽" style={{width: "80%"}}>
                                        {
                                            teacher.map(el => <Option value={el}>{el}</Option>)
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
                                <Input.Password ref={password} style={{width: "90%"}}/>
                            </div>
                        </Modal>
                    }
                    <li>
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

    }),
    dispatch => ({
        handleLogin(args) {
            if (!checkNumber(args.userId)){
                openNotification("请检查学号格式")
            } else if (args.length === 0) {
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
        }
    })
)(Header);