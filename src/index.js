import React from 'react';
import "antd/dist/antd.min.css";
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/store";

const Root = () => (
    <HashRouter basename="/">
        <Provider store={store}>
            <div className={"rootApp"}>
            <App />
            </div>
        </Provider>
    </HashRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
