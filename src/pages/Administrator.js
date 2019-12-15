import React, {useEffect, useRef, useState} from 'react';
import { connect } from "react-redux";
import "../static/style/administrator.scss";
import { Layout, Tree, Menu} from 'antd';
import { Tabs, Button } from 'antd';
import AdminMessage from "../components/administrator/AdminMessage";
import TeacherMessage from "../components/administrator/TeacherMessage";
const { TabPane } = Tabs;
const { Sider } = Layout;
const { TreeNode, DirectoryTree } = Tree;

const Administrator = props => {
    const { history, userIdentify, handleTree } = props;
    const treeFather = useRef();
    const [flag, setFlag] = useState(false);
    const tabs = [
        { title: '管理首页', content: '我是管理员首页', key: '1' },
    ];
    const [activeKey , setActiveKey ] = useState(2);
    const [panes, setPanes] = useState(tabs);
    const tab = [
        { title: '管理员信息', content: <AdminMessage/>, key: activeKey.toString()},
        { title: '教师信息', content: <TeacherMessage/>, key: activeKey.toString()},
        { title: '学生信息', content: 'Content of new Tab3', key: activeKey.toString()},
        { title: '注册用户', content: 'Content of new Tab4', key: activeKey.toString()},
        { title: '实验课程', content: 'Content of new Tab5', key: activeKey.toString()},
        { title: '教师课程', content: 'Content of new Tab6', key: activeKey.toString()},
        { title: '学生课程', content: 'Content of new Tab7', key: activeKey.toString()},
        { title: '学习资料', content: 'Content of new Tab8', key: activeKey.toString()},
        { title: '学习软件', content: 'Content of new Tab9', key: activeKey.toString()},
        { title: '实验室公告', content: 'Content of new Tab10', key: activeKey.toString()},
        { title: '清楚文件', content: 'Content of new Tab11', key: activeKey.toString()},
        { title: '导入模板', content: 'Content of new Tab12', key: activeKey.toString()},
        ];
    return(
        <>
            {
                userIdentify !== "超级管理员" ?
                    history.push('/')
                    :
                <div className="contentWrapper">
                    <Sider
                        collapsible
                        collapsedWidth="2rem"
                        theme="light"
                        className="administratorSider"
                        onClick={
                            () => handleTree(treeFather)
                        }
                        onCollapse={
                            (collapsed, type) => {
                                collapsed === true && setFlag(!flag);
                                collapsed === false && setFlag(!flag);
                            }
                        }
                    >
                        <div className="adminNav">
                            {
                                flag === false && "管理导航"
                            }
                        </div>
                        {
                            flag === false &&
                                <>
                                    <Tree
                                        showLine defaultExpandedKeys={['0-0-0']}
                                        ref={treeFather}
                                        onSelect={
                                            (selectedKeys, info) => {
                                                console.log(selectedKeys);
                                                if (info.selected === true) {
                                                    setActiveKey(activeKey + 1);
                                                    switch (selectedKeys[0]) {
                                                        case '0-0-0-0':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[0]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-0-1':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[1]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-0-2':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[2]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-0-3':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[3]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-1-0':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[4]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-1-1':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[5]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-1-2':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[6]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-2-0':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[7]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-2-1':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[8]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-3-0':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[9]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-4-0':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[10]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        case '0-0-4-1':
                                                            setActiveKey(activeKey + 1);
                                                            console.log(activeKey);
                                                            panes.push(tab[11]);
                                                            setPanes(panes);
                                                            console.log(panes);
                                                            break;
                                                        default:
                                                            return 0;
                                                    }
                                                }
                                            }
                                        }
                                    >
                                        <TreeNode title="系统管理" key="0-0">
                                            <TreeNode title="用户管理" key="0-0-0">
                                                <TreeNode title="管理员信息" key="0-0-0-0"/>
                                                <TreeNode title="教师信息" key="0-0-0-1" />
                                                <TreeNode title="学生信息" key="0-0-0-2" />
                                                <TreeNode title="注册用户" key="0-0-0-3" />
                                            </TreeNode>
                                            <TreeNode title="实验课程管理" key="0-0-1">
                                                <TreeNode title="实验课程" key="0-0-1-0" />
                                                <TreeNode title="教师课程" key="0-0-1-1" />
                                                <TreeNode title="学生课程" key="0-0-1-2" />
                                            </TreeNode>
                                            <TreeNode title="资料管理" key="0-0-2">
                                                <TreeNode title="学习资料" key="0-0-2-0" />
                                                <TreeNode title="学习软件" key="0-0-2-1" />
                                            </TreeNode>
                                            <TreeNode title="实验室管理" key="0-0-3">
                                                <TreeNode title="实验室公告" key="0-0-3-0" />
                                            </TreeNode>
                                            <TreeNode title="数据信息管理" key="0-0-4">
                                                <TreeNode title="清楚文件" key="0-0-4-0" />
                                                <TreeNode title="导入模板" key="0-0-4-1" />
                                            </TreeNode>
                                        </TreeNode>
                                    </Tree>
                                    <Tree
                                    showLine defaultExpandedKeys={['0-0-0']}
                                    ref={treeFather}
                                    >
                                        <TreeNode title="系统说明" key="0-0">
                                        <TreeNode title="实验系统管理使用介绍" key="0-0-0">
                                        </TreeNode>
                                        </TreeNode>
                                    </Tree>
                            </>
                        }
                    </Sider>
                    <div className="contentTab">
                        <Tabs
                            hideAdd
                            activeKey={activeKey}
                            type="editable-card"
                            onChange={
                                (activeKey) => {
                                    setActiveKey(activeKey);
                                }
                            }
                            //删除
                            onEdit={
                                ((targetKey) => {
                                    console.log(typeof targetKey);
                                    let lastIndex;
                                    panes.forEach((pane, i) => {
                                        if (pane.key === targetKey) {
                                            lastIndex = i - 1;
                                        }
                                    });
                                    console.log(panes);
                                    setPanes(panes.filter(pane => pane.key !== targetKey));
                                    console.log(panes);
                                    if (panes.length && activeKey === targetKey) {
                                        if (lastIndex >= 0) {
                                            setActiveKey(panes[lastIndex].key);
                                        } else {
                                            setActiveKey(panes[0].key);
                                        }
                                    }
                                    // setActiveKey(activeKey);
                                })
                            }
                        >
                            {panes.map(pane => (
                                <TabPane tab={pane.title} key={pane.key}>
                                    {pane.content}
                                </TabPane>
                            ))}
                        </Tabs>
                    </div>
                </div>
            }
        </>
    )
};
export default connect(
    state =>({
        userIdentify: state.getIn(["userMana", "common", "userIdentify"]),
    }),
    dispatch => ({
        handleTree(args) {

        }
    })
)(Administrator)