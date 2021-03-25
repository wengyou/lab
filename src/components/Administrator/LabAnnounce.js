import React, { useEffect, useState } from "react";
import BraftEditor from 'braft-editor';
import {Table, Button, Icon, Modal, Upload, Input, message} from "antd";
import {connect} from "react-redux";
import 'braft-editor/dist/index.css'
import * as announce from "../../redux/actionCreators/announce";
import * as admin from "../../redux/actionCreators/admin"
const { confirm } = Modal;
const Reg = /^[\s\S]*.*[^\s][\s\S]*$/;
const LabAnnounce = props => {
    const {
        handleQueryAnnounce,
        total,
        announceResource,
        releaseAnnounceFlag,
        deleteAnnounceFlag,
        name,
        handleReleaseAnnounce,
        handleEditAnnounce,
        handleDeleteAnnounce
    } = props;
    const [showBraft, setShowBraft] = useState(false);
    const [braftType, setBraftType] = useState('add');
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState('<p></p>'));
    const [fileList, setFilelist] = useState([]);
    const [presentPage, setPresentPage] = useState(1);
    const [selectedId, setSelectedId] = useState([]);
    const [deleteBtn, setDeleteBtn] = useState(true);
    const [announceTit, setAnnounceTit] = useState();
    const [announceId, setAnnounceId] = useState('');

    useEffect(() => {
        handleQueryAnnounce({page: presentPage, rows: 10 })
    }, [deleteAnnounceFlag]);
    useEffect(() => {
        handleQueryAnnounce({page: 1, rows: 10});
        setShowBraft(false);
        setAnnounceTit("");
        setEditorState(BraftEditor.createEditorState('<p></p>'));
        setFilelist([]);
    }, [releaseAnnounceFlag]);
    const columns = [
        {
            title: '公告标题',
            align: 'center',
            key: 'title',
            dataIndex: "title",
            width: "5rem"
        },
        {
            title: '内容',
            key: 'content',
            align: 'center',
            width: '33%',
            render: (e) => (
                <div dangerouslySetInnerHTML={{__html: e.content}}></div>
            )
        },
        {
            title: '附件名称',
            key: 'fileName',
            width: "10%",
            render: e => (
                <a
                    download={true}
                    href={e.url}
                >
                    {e.fileName}
                </a>
            )
        },
        {
            title: '发布人',
            key: 'userName',
            align: 'center',
            dataIndex: "userName",
            width: "0.75rem"
        },
        {
            title: '发布时间',
            dataIndex: 'addTime',
            align: 'center',
            key: 'addTime',
            width: "1.5rem"
        },
        {
            title: '操作',
            width: '1.5rem',
            align: 'center',
            render: (e) => {
                return (
                    <Button
                        type='primary'
                        onClick={() => {
                            editOrAddAnnounce('edit');
                            setAnnounceTit(e.title);
                            setAnnounceId(e.id);
                            setEditorState(BraftEditor.createEditorState(e.content));
                        }}
                    >
                        编辑
                    </Button>
                )
            }
        }
        ];
    const uploadProps = {
        beforeUpload:
            file => {
                fileList.push(file);
                //fileList = fileList.slice(-1);
                return false
            },
        onChange:
            ()=> {
                setFilelist(fileList.slice(-1));
            },
        onRemove:
            file => {
                const index = fileList.indexOf(file.originFileObj);
                fileList.splice(index, 1);
            }
    };

    //编辑/添加公告
    const editOrAddAnnounce = (type) => {
        setShowBraft(true);
        setBraftType(type);
        if(type === 'add') {
            setAnnounceTit('');
            setEditorState(BraftEditor.createEditorState('<p></p>'));
        }
    }
    //上传编辑或者添加
    const addOrEdit = () => {
        let editorContent = editorState.toHTML();
        fileList.length > 1 && message.error("只能上传一个附件！");
        if(Reg.test(announceTit) && editorContent){
            braftType === 'add' ? handleReleaseAnnounce({
                userName: name,
                title: announceTit,
                content: editorContent,
                file: fileList[0],
            }) :
                handleEditAnnounce({
                    announceId: announceId,
                    userName: name,
                    title: announceTit,
                    content: editorContent,
                    file: fileList[0],
                })
        } else
        {
            message.error("标题和内容不能为空！");
        }


    }

    return (
        <div style={{margin: "1.25rem 0"}}>
            <div
                style={{display: "flex"}}
            >
                <Button
                    style={{margin: "0 0.6875rem"}}
                    onClick={() => (editOrAddAnnounce('add'))}
                >
                    <Icon type={"plus"}/>
                    添加公告
                </Button>
                <Button
                    disabled={deleteBtn}
                    onClick={() => {
                        setSelectedId &&
                        confirm(
                            {
                                title: "确认删除公告吗?",
                                onOk() {
                                    selectedId !== undefined ?
                                        handleDeleteAnnounce({
                                            announceId: selectedId,
                                        }) :
                                        message.error("所选内容不能为空！");
                                    setDeleteBtn(true);
                                    setSelectedId([]);
                                },
                                onCancel() {

                                }

                            }
                        )
                    }}
                >
                    <Icon type={"delete"}/>
                    删除公告
                </Button>
            </div>
            <Table
                rowKey={e => e.id}
                bordered={true}
                columns={columns}
                dataSource={[...announceResource]}
                pagination={{
                    total,
                    onChange: e => {
                        handleQueryAnnounce({page: e, rows: 10});
                        setSelectedId([]);
                        setPresentPage(e);
                    },
                    hideOnSinglePage: true,
                }}
                rowSelection={{
                    selectedRowKeys: selectedId,
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedId(selectedRowKeys);
                        selectedRowKeys.length > 0 ? setDeleteBtn(false) : setDeleteBtn(true)

                    }
                }}
            />
            <Modal
                title={braftType=== 'add' ? "添加公告" : '编辑公告'}
                visible={showBraft}
                onCancel={() => {
                    setShowBraft(false);
                    setFilelist([]);
                }}
                onOk={addOrEdit}
                width={"50rem"}
                destroyOnClose={true}
            >
                <div
                    style={{display: "flex", alignItems: "center", margin: "0.625rem 0.625rem"}}
                >
                    <h1>公告标题</h1>
                    <Input
                        style={{width: "70%", marginLeft: "1.25rem"}}
                        value={announceTit}
                        onChange={(e) => {
                            setAnnounceTit(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <BraftEditor
                        value={editorState}
                        onChange={(e) => (
                            setEditorState(e)
                        )}
                    />
                </div>
                <div>
                    <Upload
                        style={{marginTop: "1.25rem"}}
                        {...uploadProps} fileList={fileList} >
                        <Button
                            type={"primary"}
                        >
                            {
                                braftType=== 'add' ? "添加附件" : '更改附件'
                            }
                        </Button>

                    </Upload>
                </div>
            </Modal>
        </div>
    )
};

export default connect(
    state => ({
        total: state.getIn(["announce", "total"]),
        announceResource: state.getIn(["announce", "announceResource"]),
        name: state.getIn(["userMana", "common", "name"]),
        releaseAnnounceFlag: state.getIn(["announce", "releaseAnnounceFlag"]),
        deleteAnnounceFlag: state.getIn(["announce", "deleteAnnounceFlag"]),
    }),
    dispatch => ({
        handleQueryAnnounce(page) {
            dispatch(announce.queryAnnounce(page))
        },
        handleReleaseAnnounce(args) {
            dispatch(admin.releaseAnnounce(args))
        },
        handleEditAnnounce(args) {
            dispatch(admin.editAnnounce(args))
        },
        handleDeleteAnnounce(announceId){
            dispatch(admin.deleteAnnounce(announceId))
        }
    }),
)(LabAnnounce);
