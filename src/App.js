import React, {useEffect} from 'react';
import Routes from "./Routes";
import './static/style/reset.scss';
import {connect} from "react-redux";
import AddStudents from './components/addStudents'

import {KEEP_ALIVE} from "./constants/actionTypes";

let flag = true;
function App(props) {
    const { handleKeepAlive, userIdentify } = props;
    useEffect(() => {
        if (flag) handleKeepAlive();
        flag = false;
    },[]);
  return (
      <div className="App">
        {/*<Header />*/}
        <Routes />
        <AddStudents/>
        {/*<Footer/>*/}
        {/*<BackTop />*/}
      </div>
  );
}

export default connect(
    state => ({
        userIdentify: state.getIn(["userMana", "common", "userIdentify"])
    }),
    dispatch => ({
        handleKeepAlive() {
            dispatch({ type: KEEP_ALIVE })
        }
    })
)(App);
