import React, {useState, useEffect, useRef} from "react";
import { connect } from "react-redux";
import { Button, Table, Input } from 'antd';
import * as admin from "../../redux/actionCreators/admin";

const AdminMessage = props => {
    useEffect(() => {
        handleAdministratorData({page: 1, type: 'admin'});
    },[]);
    useEffect(() => {
        handleAddAdmin({userId: teacherId, userName: teacherName, type: "admin", sex: sex})
    },[]);
    const columns = [
        {
            title: '教师编号',
            dataIndex: 'userId',
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
    const {
        adminData,
        handleAdministratorData,
        handleAddAdmin,
        total
    } = props;
    const teacherId = useRef();
    const teacherName = useRef();
    const academy = useRef();
    const sex = useRef();
    const password = useRef();

    const addAdminId = useRef();
    const addAdminName = useRef();
    const addAcademy = useRef();
    const addSex = useRef();
    const [addFlag, setAddFlag ] = useState(false);


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
                >
                    添加管理员
                </Button>
                <Button icon="edit">修改管理员</Button>
                <Button
                    icon="save"
                    onClick={
                        () => {
                            setAddFlag(false);
                            handleAddAdmin({
                                userId: addAdminId.current.state.value,
                                userName: addAdminName.current.state.value,
                                type: "admin",
                                academy: addAcademy.current.state.value,
                                sex: addSex.current.state.value
                            })
                        }
                    }
                >
                    保存
                </Button>
            </header>
            {
                addFlag === true && <div className="addWrapper">
                    <Input ref={addAdminId}/>
                    <Input ref={addAdminName}/>
                    <Input ref={addAcademy}/>
                    <Input ref={addSex}/>
                    <Input />
                </div>
            }
            <Table
                rowSelection={rowSelection}
                rowClassName={() => 'editable-row'}
                className="adminMesTable"
                columns={columns}
                onChange={
                    (e) => {
                        handleAdministratorData({
                            page: e,
                            type: 'admin'
                        })
                    }
                }
                dataSource={adminData}
            >
            </Table>
        </>
    )
};
export default connect(
    state => ({
        adminData: state.getIn(["admin", "message", "adminData"]),
    }),
    dispatch => ({
        handleAdministratorData(args) {
            dispatch(admin.fetchAdministratorData(args))
        },
        handleAddAdmin(args) {
            dispatch(admin.fetchNewAdmin(args))
        }
    })
)(AdminMessage);