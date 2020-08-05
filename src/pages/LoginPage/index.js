import React from "react";
import {connect} from "react-redux";
// import {login, loginAction} from "../actions/UserAction";
// import FooterView from "../components/FooterView";
// import {goToHomePage, goToModifyPasswordPage} from "../../util/RouterUtil";
// import {RES_SUCCEED} from "../../api/status/Status";
// import {FORM_RULE_ACCOUNT, FROM_RULE_PASSWORD} from "../constants/FormRule";
// import * as StorageUtil from "../utils/StorageUtil";
import './index.less';

// const FormItem = Form.Item;

// 登录页面
class LoginPage extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <React.Fragment>
                <div className="Login-header">
                    <div className="Login-flex">
                        <div className="Login-icon">M</div>
                        <div className="Login-font">MOJITO</div>
                    </div>
                </div>
                <div className="Login-content">
                    <div className="Login-content-warp">
                        <div className="Login-content-item">
                            <input className="ipt ipt-style" placeholder="手机号" type="text" autoComplete="off" />
                        </div>
                        <div className="Login-content-item">
                            {/* two input to show password */}
                            <input className="ipt ipt-style" placeholder="密码" type="password" autoComplete="off" />
                            <span className="pw-span pw-show"></span>
                        </div>
                        <div className="Login-submit-warp">
                            <input className="loginbox-sbt btn-sub" value="登陆" type="submit"/>
                        </div>
                    </div>
                </div>
                <div className="Login-footer">
                    <div>
                        版权所有，盗版必究
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}

export default LoginPage;