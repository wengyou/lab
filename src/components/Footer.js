import React from "react";
import {Tag} from "antd";
import "../static/style/footer.scss"
const linkArr = ['极客网', '技能认证', '开放上机', '网址大全'];
const Footer = () => {
    return (
        <div className={"footerWrap"}>
            <div className={"footer"}>
                <div className={"footerTop"}>
                    <div>
                        <p>相关链接</p>
                        {
                            linkArr.map((item)=>(
                                <Tag
                                    key={item}
                                    // style={{borderColor: "#1890FF"}}
                                >
                                    <a>
                                        {item}
                                    </a>
                                </Tag>
                            ))
                        }
                    </div>
                </div>
                <div className={"footerBottom"}>
                    <p>版权所有 极客工作室</p>
                </div>
            </div>
        </div>
    )
};

export default Footer;