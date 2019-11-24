import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Table, Carousel, Card, Modal} from "antd";
import "../static/style/home.scss";
import * as announce from "../redux/actionCreators/announce";
import "../redux/sagas/announceSagas/announceSaga"

//首页的轮播图和公告
const Home = props => {
    const {total, handleFetchAnnounceRes, announceResource } = props;
    // const [modalContent, setModalContent] = useState("");
    // const [modalUserName, setModalUserName] = useState("");
    // const [modalFileName, setModalFileName] = useState("");
    // const [modalTitle, setModalTitle] = useState("");
    const [modalContent,setModalContent] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const handleShowModal = data =>{
        setModalVisible(true);
        setModalContent(data);
    };
    console.log(modalContent);
    useEffect(()=>{
        handleFetchAnnounceRes({ page: 1})
    }, []);
    let announceRes = announceResource;

    const columns = [
        {
            title: '公告标题',
            key: 'title',
            width: '70%',
            render: (data) => (
                <span>
                <a
                    onClick={()=>handleShowModal(data)}
                >{data.title}</a>
                </span>
            ),


        },
        {
            title: '发布时间',
            dataIndex: 'addTime',
            key: 'addTime',
            color: "blue"
        }];
    return (
        <div className="wrap">
            <div className = "homeWrap">
                <div className = "homeLeft">
                    <Card
                        title={"实验室公告"}
                    >
                        <Table
                            bordered={true}
                            dataSource = {announceRes}
                            // style={{
                            //     minHeight:370,
                            // }}
                            columns = {columns}
                            // bordered={true}
                            // size={"small"}
                            pagination = {{
                                total,
                                onChange: e => handleFetchAnnounceRes({ page: e }),
                                hideOnSinglePage:true
                            }}
                        />
                        <Modal
                            centered={true}
                            title = {modalContent.title}
                            visible={modalVisible}
                            onOk={()=>(setModalVisible(!modalVisible))}
                            onCancel={()=>(setModalVisible(!modalVisible))}
                        >
                            <div style={{width:"100%",marginBottom:"10px", display:"flex", justifyContent:"center"}}>{modalContent.userName}</div>
                            <div dangerouslySetInnerHTML = {{__html: modalContent.content}} />
                            <div style={{marginTop:"15px"}}>附件: {modalContent.fileName}</div>
                        </Modal>
                    </Card>
                </div>
                <div className = "homeRight">
                    <Carousel autoplay>
                        <div className={"img-1"}/>
                        <div className={"img-2"}/>
                        <div className={"img-3"}/>
                        <div className={"img-4"}/>
                    </Carousel>
                </div>
            </div>
        </div>
    )
};

export default connect(
    //允许我们将store中的数据作为props绑定到组件中，只要store发生了变化就会调用，必须返回一个纯对象，这个对象会与组件的 props 合并
    state => ({
        total: state.getIn(["announce", "total"]),
        announceResource: state.getIn(["announce", "announceResource"])

    }),
    dispatch => ({
        handleFetchAnnounceRes(page) {
            dispatch(announce.queryAnnounce(page))
        }
    })
)(Home);