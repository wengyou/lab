import React from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"
import menuConfig from "../../static/administratorMenuConfig";
import {LOG_OUT} from "../../constants/actionTypes";

const Header = props =>{
    const { userName, handleLogOut } = props;
    const getTitle = () =>{
        const path = props.location.pathname;
        let title;
        menuConfig.forEach(item => {
            if(item.key === path){
                title = item.title;
            } else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path);
                if(cItem){
                    title = cItem.title;
                }
            }

        });
        return title;
    };
    const title = getTitle();
    return (
        <div style={{ height: "81px", background: "white" }}>
         <div style={{width: "100%", height: "40px", display: "flex", justifyContent:"flex-end", alignItems: "center", padding: "0 20px"}} >
             <span>欢迎 {userName}</span>
             <span
                 style={{padding: "0 15px"}}
             >
                 <a
                     onClick={
                         (e) => {
                             e.preventDefault();
                             sessionStorage.removeItem('access');
                             handleLogOut();
                             window.location.href="/";
                         }
                     }
                 >
                     退出
                 </a>
             </span>

         </div>
         <div style={{ height: "40px", width: "100%", borderTop: "1px solid #7E7E7E", display: "flex", alignItems: "center"}}>
             <span className={"adminNavTitle"} style={{padding: "0 50px", fontSize: "18px", }}>{title}</span>
         </div>

        </div>
    )
};

export default withRouter(connect(
    state => ({
        userName: state.getIn(["userMana", "common", "userIdentify"]),
        login: state.getIn(["userMana", "common", "login"])
        }),
    dispatch => ({
        handleLogOut() {
            dispatch({type: LOG_OUT});
        },
    })
)(Header));
