import React, {useState, useEffect, useRef} from "react";
import { connect } from "react-redux";
import { Button, Table, Input } from 'antd';
import * as admin from "../../redux/actionCreators/admin";

const TeacherMessage = props => {
    const { adminTeacherData, handleTeacherData, total, handleAddTeacher } = props;
    const columns = [
        {
            title: '教师编号',
            dataIndex: 'id',
            render: (text, record) => (
                <Input defaultValue={text} ref={teacherId}/>
            ),
        },
        {
            title: '教师姓名',
            dataIndex: 'userName',
            render: (text, record) => (
                <Input defaultValue={text} ref={teacherName}/>
            ),
        },
        {
            title: '学院',
            dataIndex: 'academy',
            render: (text, record) => (
                <Input  defaultValue={text} ref={academy}/>
            ),
        },
        {
            title: '电话',
            dataIndex: 'phone',
            render: (text, record) => (
                <Input defaultValue={text} ref={phone} />
            )
        },
        {
            title: '性别',
            dataIndex: 'sex',
            render: (text, record) => (
                <Input  defaultValue={text} ref={sex}/>
            ),
        },
        {
            title: '登录密码',
            dataIndex: 'password',
            render: (text, record) => (
                <Input  defaultValue={text} ref={password}/>
            ),
        }
    ];
    const teacherId = useRef();
    const teacherName = useRef();
    const academy = useRef();
    const phone = useRef();
    const sex = useRef();
    const password = useRef();
    const addTeacherId = useRef();
    const addTeacherName = useRef();
    const addAcademy = useRef();
    const addPhone = useRef();
    const addSex = useRef();
    const [addFlag, setAddFlag ] = useState(false);

    useEffect(()=> {
        handleTeacherData({page: 1, type: "teacher"})
    }, []);
    useEffect(() => {
        handleAddTeacher({userId: addTeacherId, userName: addTeacherName, type: "teacher", phone: addPhone, sex: addSex})
    },[]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };


    return(
        <>
            <header className="adminHeader">
                <Button
                    icon="plus"
                    onClick={() => setAddFlag(true)}
                >添加教师</Button>
                <Button icon="delete">删除教师</Button>
                <Button icon="edit">修改教师</Button>
                <Button
                    icon="save"
                    onClick={
                        () => {
                            setAddFlag(false);
                            handleAddTeacher({
                                userId: addTeacherId.current.state.value,
                                userName: addTeacherName.current.state.value,
                                type: "teacher",
                                phone: addPhone.current.state.value,
                                sex: addSex.current.state.value
                            })
                        }
                    }
                >保存</Button>
            </header>
            {
                addFlag === true && <div className="addWrapper">
                    <Input ref={addTeacherId}/>
                    <Input ref={addTeacherName}/>
                    <Input ref={addAcademy}/>
                    <Input ref={addPhone}/>
                    <Input ref={addSex}/>
                    <Input />
                </div>
            }
            <Table
                rowSelection={rowSelection}
                className="adminMesTable"
                columns={columns}
                dataSource={adminTeacherData}
                pagination={{
                    total,
                    pageSize: 10,
                    defaultCurrent: 1,
                    onChange: e => {
                        handleTeacherData({
                            page: e,
                            type: 'teacher',
                        })
                    }
                }}

            />
        </>
    )
};

export default connect(
    state => ({
        total: state.getIn(["admin", "message", "total"]),
        adminTeacherData: state.getIn(["admin", "message", "adminTeacherData"]),
    }),
    dispatch => ({
        handleTeacherData(args){
            dispatch(admin.fetchTeacherData(args));
        },
        handleAddTeacher(args) {
            dispatch(admin.addNewTeacher(args));
        }
    })
)(TeacherMessage);