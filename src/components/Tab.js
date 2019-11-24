import React from "react";
import {Link, withRouter} from "react-router-dom";
import { Tabs,  } from 'antd';
import tabConfig from "../static/configs/tabConfig";
const { TabPane } = Tabs;

const Tab = () => {
    return (
            <div style={{display: "flex", justifyContent:"center",width:"100%" }}>
                <Tabs  style={{width:"1024px", height:"auto" }}>
                {
                    tabConfig.map((item)=>(
                        <TabPane
                            key={item.id}
                            tab={<Link to = { item.key }>{item.title}</Link>}
                        />
                        )
                    )
                }
                </Tabs>
        </div>
    )
};

export default withRouter(Tab);

//如果需要添加图标就这样写
// (!item.icon) ?
//     <TabPane
//         key={item.id}
//         tab={<Link to = { item.key }>{item.title}</Link>}
//     /> :
//     <TabPane
//         key={item.id}
//         tab={<Link to = { item.key }>
//                 {item.title}
//                 <Icon type = {item.icon} />
//              </Link>
//         }
//     />
