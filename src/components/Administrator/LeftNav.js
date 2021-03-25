import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import menuConfig from "../../static/administratorMenuConfig";
const { SubMenu } = Menu;
const getMenuNodes = (menuConfig) => {
    return menuConfig.map(item => {
        if(!item.children){
            return (
                <Menu.Item key = {item.key}>
                    <Link to = {item.key}>
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            )
        } else {
            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>{item.title}</span>
                    }
                >
                    {
                        getMenuNodes(item.children)
                    }
                </SubMenu>
            )
        }
    })
};

const LeftNav = props => {
    const path = props.location.pathname;
    const $path = path.substring(0, path.lastIndexOf('/'));
    return(
        <Menu
            style={{height: "100%"}}
            mode="inline"
            selectedKeys={[path]}
            defaultOpenKeys = {[$path]}
        >
            <Menu.Item>
                <div
                    style={{ marginLeft: "20px", fontWeight: "bolder" }}
                >
                    经济管理学院实验室系统
                </div>
            </Menu.Item>
            {
                getMenuNodes(menuConfig, props)
            }
        </Menu>
    )

};
export default withRouter(LeftNav)
