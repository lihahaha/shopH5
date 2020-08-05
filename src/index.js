import React from 'react';
import { render } from 'react-dom';
import configureStore from './store' // 引入redux
import { BrowserRouter, Route, Link } from "react-router-dom";
// React-Redux 提供<Provider/>组件，能够使你的整个app访问到Redux store中的数据：
import { Provider } from 'react-redux';
import '../lib/reset.less';

import LoginPage from "./pages/LoginPage";
// import HomePage from "./containers/HomePage";
const store = configureStore()

render(
    <Provider store={store}>
        
        <BrowserRouter forceRefresh={true}>
            {/* <Route exact path={ROUTER_HOME} component={HomePage}/> */}
            <Route path='/login' component={LoginPage}/>
            {/* <Route path={ROUTER_MODIFY_PASSWORD} component={ModifyPasswordPage}/> */}
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)
