import React, {useEffect} from 'react';
import Routes from "./Routes";
import { BackTop } from "antd";
import './static/style/reset.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {connect} from "react-redux";
import {KEEP_ALIVE} from "./constants/actionTypes";

let flag = true;
function App(props) {
    const { handleKeepAlive } = props;
    useEffect(() => {
        if (flag) handleKeepAlive();
        flag = false;

    },[]);
  return (
      <div
          //style={{minHeight: 'calc("100vh - 250px")'}}
          className="App column col-center-start">
        <Header />
        <Routes/>
        <Footer/>
        <BackTop />
      </div>
  );
}

export default connect(
    null,
    dispatch => ({
        handleKeepAlive() {
            dispatch({ type: KEEP_ALIVE })
        }
    })
)(App);