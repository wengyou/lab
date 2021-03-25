import React, {useEffect} from "react";
import { connect } from "react-redux";
import {Tag} from "antd";
import "../static/style/footer.scss"
import {COUNTER, FETCH_PARAM} from "../constants/actionTypes";
const linkArr = [
    {
        title: '极客网',
        url: ''
    },
    {
        title: '技能认证',
        url: 'http://172.22.4.29:8000/'
    },
    {
        title: '开放上机',
        url: 'http://172.22.4.29/'
    },
    {
        title: '网址大全',
        url: 'http://202.202.43.125/'
    }
    ]
const Footer = (props) => {
    const { handleCounter, handleParam, pv, uv } = props;
    useEffect(() => {
        handleCounter();
        handleParam()
    },[]);
    return (
        <div className={"footerWrap"}>
            <div className={"footer"}>
                <div className={"footerTop"}>
                    <div>
                        <p>相关链接</p>
                        {
                            linkArr.map((item)=>(
                                <Tag
                                    key={item.url}
                                >
                                    <a href={item.url}>
                                        {item.title}
                                    </a>
                                </Tag>
                            ))
                        }
                    </div>
                </div>
                <div className={"footerBottom"}>
                    <p>版权所有 极客工作室</p>
                    <p style={{marginLeft: "1rem"}}>页面刷新量：{pv || 0}</p>
                    <p style={{marginLeft: "1rem"}}>用户登录次数：{uv || 0}</p>
                </div>
            </div>
        </div>
    )
};

export default connect(
    state => ({
        counter: state.getIn(["userMana", "common", "counter"]),
        pv: state.getIn(["userMana", "common", "pv"]),
        uv: state.getIn(["userMana", "common", "uv"]),
    }),
    dispatch => ({
        handleCounter() {
            dispatch({type: COUNTER});
        },
        handleParam() {
            dispatch({type: FETCH_PARAM})
        }
    })
)(Footer);
