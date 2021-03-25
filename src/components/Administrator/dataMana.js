import React, {useEffect, useRef, useState} from "react";
import { Card, Button, Slider, InputNumber, Row, Col } from 'antd';
import {connect} from "react-redux";
import * as admin from "../../redux/actionCreators/admin"
import {FETCH_PARAM} from "../../constants/actionTypes";

const DataMana = props => {
    const { 
        handleAdminClearData, 
        paramSystem, 
        handleParam,
        modifyParam
    } = props;
    const [workLimit, setWorkLimit] = useState('');
    const [taskLimit, setTaskLimit] = useState('');
    const [softwareLimit, setSoftwareLimit] = useState('');
    const [meterialLimit, setMeterialLimit] = useState('');
    const [announceLimit, setAnnounceLimit] = useState('');
    useEffect(() => {
        handleParam()
    }, [])
    useEffect(() => {
        paramSystem.size !== 0 && setWorkLimit(paramSystem[4].keyValue)
        paramSystem.size !== 0 && setTaskLimit(paramSystem[5].keyValue)
        paramSystem.size !== 0 && setSoftwareLimit(paramSystem[3].keyValue)
        paramSystem.size !== 0 && setMeterialLimit(paramSystem[2].keyValue)
        paramSystem.size !== 0 && setAnnounceLimit(paramSystem[1].keyValue)
    }, [paramSystem])
    return (
        <div
            style={{ width: "100%", marginTop: "20px"}}
        >
            <Card title = "清除说明" style={{ padding: "10px 10px", margin: "20px 20px"}}>
                <p>该功能是用于删除教师在批量下载学生作业时所产生的打包临时文件</p>
                <br/>
                <p>删除时只会删除临时文件</p>
                <br/>
                <p>不会对学生作业产生影响</p>
                <br/>
                <p>删除的好处是节约系统硬盘空间</p>
                <br/>
                <Button
                    type = "primary"
                    onClick={()=>{
                        handleAdminClearData()
                    }}
                >
                    确认清除
                </Button>
            </Card>
            <Card title = "导入说明" style={{ padding: "10px 10px", margin: "20px 20px"}}>
                <p>若要导入学生信息,只需要在学生信息中点击批量导入,然后选择相应的学生文件。</p>
                <br/>
                <p>教师的导入和学生的一样。</p>
                <br/>
                <p>课程的导入是下载课程导入模板，然后将课程信息按模板格式填写后导入。</p>
                <br/>
                <span><span>教师或学生导入模板</span><a style={{marginLeft: "20px"}} href={""}>teacherOrStudent.xls</a></span>
                <br/>
                <span><span>课程导入模板</span><a style={{marginLeft: "20px"}} href={""}>course.xls</a></span>

            </Card>

            <Card title = "上传大小限制调节" style={{ padding: "10px 10px", margin: "20px 20px"}}>
                <p>作业，资料，软件，公告，附件上传大小限制可调节，范围从5MB-5120MB（5G）。</p>
                {/* 作业上传 */}
                <div style={{marginTop: '1rem'}}>
                    <p>上传作业大小限制（单位MB）：</p>
                    <Row style={{display: 'flex'}}>
                        <Col span={12}>
                        <Slider
                            min={5}
                            max={5120}
                            onChange={(e) => setWorkLimit(e)}
                            value={workLimit}
                        />
                        </Col>
                        <Col span={4}>
                        <InputNumber
                            min={5}
                            max={5120}
                            style={{ margin: '0 16px' }}
                            value={workLimit}
                            onChange={(e) => setWorkLimit(e)}
                        />
                        </Col>
                        <Button
                            onClick={() => {modifyParam({'key_name': 'work_file_max_size', 'key_value': workLimit})}}
                        >确认修改</Button>
                    </Row>  
                </div> 
                {/* 资料上传 */}
                <div style={{marginTop: '1rem'}}>
                    <p>上传资料大小限制（单位MB）：</p>
                    <Row style={{display: 'flex'}}>
                        <Col span={12}>
                        <Slider
                            min={5}
                            max={5120}
                            onChange={(e) => setMeterialLimit(e)}
                            value={meterialLimit}
                        />
                        </Col>
                        <Col span={4}>
                        <InputNumber
                            min={5}
                            max={5120}
                            style={{ margin: '0 16px' }}
                            value={meterialLimit}
                            onChange={(e) => setMeterialLimit(e)}
                        />
                        </Col>
                        <Button
                            onClick={() => {modifyParam({'key_name': 'material_file_max_size', 'key_value': meterialLimit})}}
                        >确认修改</Button>
                    </Row>  
                </div> 
                {/* 软件上传 */}
                <div style={{marginTop: '1rem'}}>
                    <p>上传软件大小限制（单位MB）：</p>
                    <Row style={{display: 'flex'}}>
                        <Col span={12}>
                        <Slider
                            min={5}
                            max={5120}
                            onChange={(e) => setSoftwareLimit(e)}
                            value={softwareLimit}
                        />
                        </Col>
                        <Col span={4}>
                        <InputNumber
                            min={5}
                            max={5120}
                            style={{ margin: '0 16px' }}
                            value={softwareLimit}
                            onChange={(e) => setSoftwareLimit(e)}
                        />
                        </Col>
                        <Button
                            onClick={() => {modifyParam({'key_name': 'software_file_max_size', 'key_value': softwareLimit})}}
                        >确认修改</Button>
                    </Row>  
                </div> 
                {/* 公告上传 */}
                <div style={{marginTop: '1rem'}}>
                    <p>上传公告大小限制（单位MB）：</p>
                    <Row style={{display: 'flex'}}>
                        <Col span={12}>
                        <Slider
                            min={5}
                            max={5120}
                            onChange={(e) => setAnnounceLimit(e)}
                            value={announceLimit}
                        />
                        </Col>
                        <Col span={4}>
                        <InputNumber
                            min={5}
                            max={5120}
                            style={{ margin: '0 16px' }}
                            value={announceLimit}
                            onChange={(e) => setAnnounceLimit(e)}
                        />
                        </Col>
                        <Button
                            onClick={() => {modifyParam({'key_name': 'announce_file_max_size', 'key_value': announceLimit})}}
                        >确认修改</Button>
                    </Row>  
                </div> 
                {/* 附件上传 */}
                <div style={{marginTop: '1rem'}}>
                    <p>上传附件大小限制（单位MB）：</p>
                    <Row style={{display: 'flex'}}>
                        <Col span={12}>
                        <Slider
                            min={5}
                            max={5120}
                            onChange={(e) => setTaskLimit(e)}
                            value={taskLimit}
                        />
                        </Col>
                        <Col span={4}>
                        <InputNumber
                            min={5}
                            max={5120}
                            style={{ margin: '0 16px' }}
                            value={taskLimit}
                            onChange={(e) => setTaskLimit(e)}
                        />
                        </Col>
                        <Button
                            onClick={() => {modifyParam({'key_name': 'task_file_max_size', 'key_value': taskLimit})}}
                        >确认修改</Button>
                    </Row>  
                </div> 
            </Card>
        </div>
    )

};
export default connect(
    state => ({
        paramSystem: state.getIn(["admin", "userManage", "paramSystem"]),
        adminTotal: state.getIn(["admin", "userManage", "adminTotal"]),
        adminStudentData: state.getIn(["admin", "userManage", "adminStudentData"]),
    }),
    dispatch => ({
        handleAdminClearData(){
            dispatch(admin.adminClearData())
        },
        handleParam() {
            dispatch({type: FETCH_PARAM})
        },
        modifyParam(args) {
            dispatch(admin.modifyParam(args))
        }
    }),
)(DataMana);