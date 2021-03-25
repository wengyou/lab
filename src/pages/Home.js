import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Table, Carousel, Card, Modal, Button} from "antd";
import "../static/style/home.scss";
import * as announce from "../redux/actionCreators/announce";
import "../redux/sagas/announceSagas/announceSaga"

//首页的轮播图和公告
const Home = props => {
    const {total, handleFetchAnnounceRes, announceResource } = props;
    const [modalContent,setModalContent] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const handleShowModal = data =>{
        setModalVisible(true);
        setModalContent(data);
    };
    useEffect(()=>{
        handleFetchAnnounceRes({ page: 1, rows: 4})
    }, []);

    const columns = [
        {
            title: '公告标题',
            key: 'title',

            width: '70%',
            render: (data) => (
                <span><a onClick={()=>handleShowModal(data)}>{data.title}</a></span>
            ),


        },
        {
            title: '发布时间',
            align: 'center',
            dataIndex: 'addTime',
            key: 'addTime',
            color: "blue"
        }];
    return (
        <div className="wrap">
            <div className = "homeWrap">
                <div className = "homeLeft">
                    <Card
                        bordered={false}
                        title={"实验室公告"}
                    >
                        <Table
                            rowKey={e=>(e.id)}
                            dataSource = {[...announceResource]}
                            columns = {columns}
                            pagination = {{
                                total,
                                hideOnSinglePage: true,
                                simple: true,
                                pageSize: 4,
                                onChange: e => handleFetchAnnounceRes({ page: e, rows: 4 }),
                            }}
                        />
                        <Modal
                            centered={true}
                            title = {modalContent.title}
                            visible={modalVisible}
                            footer={
                                <Button
                                    type = "primary"
                                    onClick={()=>(setModalVisible(!modalVisible))}
                                >确定</Button>
                            }
                            onCancel={()=>(setModalVisible(!modalVisible))}
                        >
                            <div dangerouslySetInnerHTML = {{__html: modalContent.content}} />
                            <div style={{marginTop:"0.9375rem"}}>附件:
                                {
                                    modalContent.fileName ?
                                        <a
                                            download={""}
                                            href={modalContent.url}
                                            style={{marginLeft:"0.6rem"}}
                                        >
                                            {modalContent.fileName}
                                        </a> :
                                        '无'
                                }
                            </div>
                            <div style={{width:"100%", display:"flex", justifyContent:"flex-end"}}>—— {modalContent.userName}</div>
                        </Modal>
                    </Card>
                </div>
                <div className = "homeRight">
                    <Carousel autoplay>
                        <div className={"img-1"}/>
                        <div className={"img-2"}/>
                        <div className={"img-3"}/>
                        <div className={"img-4"}/>
                        <div className={"img-5"}/>
                        <div className={"img-6"}/>
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
