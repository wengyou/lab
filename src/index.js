import  "./polyfill";
import  "core-js/es";
import  "mutation-observer";
import  "react-app-polyfill/ie9";
import  "react-app-polyfill/stable"

import React from 'react';
import "antd/dist/antd.min.css";
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from 'antd';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/store";
import zhCN from 'antd/es/locale/zh_CN';

const Root = () => (
    <HashRouter basename="/">
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <div className={"rootApp"}>
                    <App />
                </div>
            </Provider>
        </ConfigProvider>
    </HashRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
