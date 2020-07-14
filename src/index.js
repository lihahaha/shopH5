import React from 'react';
import { render } from 'react-dom';
import configureStore from './store' // 引入redux

// React-Redux 提供<Provider/>组件，能够使你的整个app访问到Redux store中的数据：
import {Provider} from 'react-redux'
console.log(1111111111111)
const store = configureStore()

render(
    <Provider store={store}>
        <div>111</div>
    </Provider>,
)
document.getElementById('app');