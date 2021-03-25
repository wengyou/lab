import React,{ useState, useEffect} from "react";
import { Upload,Button, Icon } from 'antd';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import "../static/style/learningDatas.scss";
import * as resource from "../redux/actionCreators/resource";

const UpLoad = props => {
    const {handleUpload, userId, userName, time, uploadFlag, history } = props;
    const [ fileList, setFileList,] = useState([]);
    const [ uploading, setUploading ] = useState(false);
    const [type, setType] = useState('')
    useEffect(() => {
        setUploading(false);
    }, [uploadFlag]);
    useEffect(() => {
        history.location.pathname === "/user/resource/myresource" && setType('material')
        history.location.pathname === "/user/download/mysoftware" && setType('software')
    }, [history.location.pathname])
    return(
        <div key={ time }>
            <div style={{display: 'flex'}} className='uploadWrap'>
                <Upload
                    beforeUpload={
                        file => {
                            fileList.push(file);
                            setFileList([...fileList]);
                            return false
                        }
                    }
                    onRemove={
                        file => {
                            const index = fileList.indexOf(file);
                            const newFileList = fileList.slice();
                            fileList.splice(index, 1);
                        }
                    }
                >
                    <Button >
                        <Icon type="upload" />
                        {type === "material" ? "选择资料": "选择软件"}
                    </Button>
                </Upload>
                <Button
                    key={time}
                    type="primary"
                    loading={uploading}
                    style={{ margin: 16 }}
                    onClick={
                        () => {
                            fileList.forEach((file) => {
                                handleUpload({
                                    type: type,
                                    userId: userId,
                                    file: file,
                                    userName: userName,
                                    page: 1
                                });
                            });
                            setFileList([]);
                            setUploading(true);
                        }
                    }
                    disabled={fileList.length === 0}
                >
                    <Icon type="upload" />
                    {uploading ? '资料上传' : '开始上传'}
                </Button>
            </div>

            {/* <Button
                key={time}
                type="primary"
                loading={uploading}
                style={{ marginTop: 16 }}
                onClick={
                    () => {
                        fileList.forEach((file) => {
                            handleUpload({
                                type: type,
                                userId: userId,
                                file: file,
                                userName: userName,
                                page: 1
                            });
                        });
                        setFileList([]);
                        setUploading(true);
                    }
                }
                disabled={fileList.length === 0}
            >
                <Icon type="upload" />
                {uploading ? '资料上传' : '开始上传'}
            </Button> */}
            <style>
                {
                    `
                        .uploadWrap > span {
                            display: flex;
                            align-items: center;
                        }
                    `
                }
            </style>
        </div>
    )
};

export default withRouter(connect(
    state => ({
        type: state.getIn(["resource", "resource", "type"]),
        userId: state.getIn(["userMana", "common", "userId"]),
        userName: state.getIn(["userMana", "common", "name"]),
        time: state.getIn(["resource", "resource", "time"]),
        uploadFlag: state.getIn(["resource", "resource", "uploadFlag"])
    }),
    dispatch => ({
        handleUpload(args) {
            dispatch(resource.fetchUploadStudyRes(args))
        }
    })
)(UpLoad));
