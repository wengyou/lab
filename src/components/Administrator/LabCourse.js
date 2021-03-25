import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import {Input, Table, Button, Icon, Modal, message, Upload, Select} from "antd";
import * as admin from "../../redux/actionCreators/admin";
const { confirm } = Modal;
const { Option } = Select;
const { Search } = Input;
const Reg = /^[\s\S]*.*[^\s][\s\S]*$/;
const numberReg = /[a-zA-Z0-9]{6,8}/;

const LabCourse = props => {
    const {labCourses, labCourseTotal,addCourseFlag, deleteCourseFlag,importCourseFlag, userId, handleQueryLabCourse, handleAddlabCourse, handleDeletelabCourse, handleImportlabCourse} = props;
    const [showAdd, setShowAdd] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [courseName, setCourseName] = useState();
    const [courseNumber, setCourseNumber] = useState();
    const [selected, setSelected] = useState([]);
    const [deleteBtn, setDeleteBtn] = useState(true);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [presentPage, setPresentPage] = useState(1);
    useEffect(()=>{
        if(Math.ceil(labCourseTotal / 10) > presentPage){
            handleQueryLabCourse({ page: presentPage, userId: userId,  })
        } else if(presentPage > 1) {
            handleQueryLabCourse({ page: presentPage-1, userId: userId,  });
        }
    },[deleteCourseFlag]);
    useEffect(()=>{
        handleQueryLabCourse({ page: 1, userId: userId,  });
        setShowAdd(false);
        setPresentPage(1);
    },[addCourseFlag]);
    useEffect(()=>{
        setShowImport(false);
        handleQueryLabCourse({page: 1, userId: userId})
    }, [importCourseFlag]);

    const columns = [
        { title: "课程名", dataIndex: "courseName", key: "courseName"},
        { title: "课程编号", dataIndex: "courseNumber", key: "courseNumber"},
        { title: "发布人", dataIndex: "userId", key: "userId"},
        { title: "发布时间", dataIndex: "addTime", key: "addTime"},
    ];
    const dataSource = [...labCourses];
    const uploadProps = {
        beforeUpload:
            file => {
                fileList.push(file);
                fileList.length === 1 ? setUploadBtn(true) : setUploadBtn(false);
                return false
            },
        onRemove:
            file=>{
                const index = fileList.indexOf(file.originFileObj);
                fileList.splice(index, 1);
                fileList.length === 1 ? setUploadBtn(true) : setUploadBtn(false);
            }
    };
    return (
        <div
            style={{ margin: "0.625rem 0.625rem" }}
        >
            <div
                style={{ display: "flex", }}
            >
                <Button
                    style={{margin: " 0 0.625rem"}}
                    onClick = {()=>(setShowAdd(true))}
                >
                    <Icon type={"plus"} />
                    添加课程
                </Button>
                <Button
                    style={{marginRight: "0.625rem"}}
                    disabled={deleteBtn}
                    onClick={()=>
                        confirm({
                            title: '确认删除吗?',
                            onOk() {
                                handleDeletelabCourse({
                                    courseIdList: selected,
                                });
                                setSelected([]);
                                setDeleteBtn(true);
                            },
                            onCancel() {
                            },
                        })
                    }
                >
                    <Icon type={"delete"} />
                    删除课程
                </Button>
                <Button
                    style={{marginRight: "0.625rem"}}
                    onClick={()=>{
                        setShowImport(true);
                        setUploadBtn(false);
                    }}
                >
                    <Icon type={"plus-circle"} />
                    批量导入
                </Button>
                <div  style={{display: "flex", flexWrap: "nowrap", width: "20rem"}}>
                    <Select defaultValue={"courseName"} style={{ width: "5.625rem" }}>
                        <Option value={"courseName"}>课程名</Option>
                    </Select>
                    <Search
                        placeholder="请输入搜索内容"
                        onSearch={(e) =>{
                            Reg.test(e) ? handleQueryLabCourse({
                                page: 1,
                                userId: userId,
                                courseName: e,
                            }) : handleQueryLabCourse({
                                page: 1,
                                userId: userId,
                                courseName: "",
                            });
                            setPresentPage(1);
                        }}
                        enterButton
                        style={{ width: 200 }}
                    />
                </div>
            </div>
            <Table
                rowKey={e=>e.id}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    total: labCourseTotal,
                    current: presentPage,
                    onChange: (e) => {
                        handleQueryLabCourse({ page: e, userId: userId });
                        setPresentPage(e);
                        setSelected([]);
                    }
                }}
                rowSelection ={{
                    selectedRowKeys: selected,
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelected(selectedRowKeys);
                        selectedRowKeys.length > 0 ? setDeleteBtn(false) : setDeleteBtn(true);
                    }
                }}
            />
            <Modal
                title = "添加课程"
                okText = "添加"
                cancelText = "取消"
                destroyOnClose={true}
                visible={showAdd}
                onCancel={()=>(setShowAdd(false))}
                onOk={() => {
                    if (courseNumber) {
                        ((Reg.test(courseName) && courseName.length > 1) && numberReg.test(courseNumber)) ?
                            handleAddlabCourse({
                                courseName,
                                courseNumber,
                                userId
                            }) :
                            message.error("非法输入！");
                        setCourseNumber("");
                        setCourseName("");
                    }
                }
                }
            >
                <div>
                    <div
                        style={{display: "flex", alignItems: "center"}}
                    >
                        <label>课程名 : </label>
                        <Input
                            placeholder={"输入长度在2-30位"}
                            style={{width: "70%", marginLeft: "2.1875rem"}}
                            value={courseName}
                            onChange={(e)=>(setCourseName(e.target.value))}
                        />
                    </div>
                    <div
                        style={{display: "flex", alignItems: "center"}}
                    >
                        <label>课程编号 : </label>
                        <Input
                            style={{width: "70%", margin: "1.25rem"}}
                            placeholder={"输入长度在6-8位"}
                            value={courseNumber}
                            onChange={(e)=>(setCourseNumber(e.target.value))}
                        />
                    </div>
                </div>
            </Modal>
            <Modal
                destroyOnClose={true}
                title={"批量导入课程"}
                visible={showImport}
                okText = "导入"
                cancelText = "取消"
                onCancel={()=>{
                    setShowImport(false);
                    setFileList([]);
                }}
                onOk={()=>{
                    const name = fileList[0].name;
                    if (fileList.length !== 1) {
                        message.error("请选择文件！")
                    } else if (name.substring(name.indexOf(".")+1) === "xlsx" ||
                        name.substring(name.indexOf(".")+1) === "xls"
                        ){
                        message.loading("导入中");
                        handleImportlabCourse({
                            userId,
                            file: fileList
                        });
                        setFileList([]);
                    } else {
                        message.error("文件格式错误！");
                    }
                }}
            >
                <Upload {...uploadProps}>
                    <Button
                        disabled={uploadBtn}
                    >
                        <Icon type={"upload"} />
                        选择文件
                    </Button>
                </Upload>
            </Modal>
        </div>
    )

};
export default connect(
    state => ({
        userId: state.getIn(["userMana", "common", "userId"]),
        labCourses: state.getIn(["admin", "labCourse", "labCourses"]),
        labCourseTotal: state.getIn(["admin", "labCourse", "labCourseTotal"]),
        addCourseFlag: state.getIn(["admin", "labCourse", "addCourseFlag"]),
        deleteCourseFlag: state.getIn(["admin", "labCourse", "deleteCourseFlag"]),
        importCourseFlag: state.getIn(["admin", "labCourse", "importCourseFlag"]),
    }),
    dispatch => ({
        handleQueryLabCourse(args){
            dispatch(admin.adminQueryLabCourse(args));
        },
        handleAddlabCourse(args){
            dispatch(admin.addLabCourse(args))
        },
        handleDeletelabCourse(args) {
            dispatch(admin.deleteLabCourse(args))
        },
        handleImportlabCourse(args) {
            dispatch(admin.importLabCourse(args))
        }
    }),
)(LabCourse);
