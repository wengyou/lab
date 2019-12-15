import React,{ useState, useRef, useEffect} from "react";
import { Upload, message, Button, Icon } from 'antd';
import { connect } from "react-redux";
import "../static/style/learningDatas.scss";
import * as resource from "../redux/actionCreators/resource";

const UpLoad = props => {
    const {handleUpload, userId, type, userName,upLoading, file } = props;
    const [ fileList, setFileList,] = useState([]);
    const [ uploading, setUploading ] = useState(upLoading);
    useEffect(() => {
        setFileList(fileList)
    },[]);
    useEffect(() =>{
        setUploading(upLoading)
    },[]);
    console.log(fileList);
    return(
        <div>
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
                        console.log(index,newFileList);
                        fileList.splice(index, 1);
                    }
                }
            >
                <Button>
                    <Icon type="upload" />
                    {type === "material" ? "资料上传": "软件上传"}
                </Button>
            </Upload>
            <Button
                type="primary"
                loading={uploading}
                style={{ marginTop: 16 }}
                onClick={
                    () => {
                        fileList.forEach(function (file, index, fileList) {
                            console.log(file);
                            console.log(index);
                            handleUpload({
                                type: type,
                                userId: userId,
                                file: file,
                                userName: userName,
                                page: 1
                            });
                        });
                        setFileList([]);
                    }
                }
                disabled={fileList.length === 0}
            >
                {upLoading ? 'Uploading' : 'Start Upload'}
            </Button>
        </div>
    )
};

export default connect(
    state => ({
        type: state.getIn(["resource", "resource", "type"]),
        userId: state.getIn(["userMana", "common", "userId"]),
        userName: state.getIn(["userMana", "common", "name"]),
        upLoading: state.getIn(["resource", "resource", "upLoading" ]),
    }),
    dispatch => ({
        handleUpload(args) {
            dispatch(resource.fetchUploadStudyRes(args))
        }
    })
)(UpLoad);