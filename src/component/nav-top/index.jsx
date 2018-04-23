/*
* @Author: Rosen
* @Date:   2018-01-23 19:59:56
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 12:49:37
*/
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil       from 'util/ajax.jsx';
import User        from 'service/user-login.jsx';

let _user = new User();

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:_user.getItem('username') || ''
        }
    }
    // 退出登录
    onLogout(username){
    //    _user.logOut(username).then(res=>{
           _user.removeItem('username');
           window.location.href = '/login';
    //    },errMsg =>{
    //        _user.errorTips(errMsg);
    //    })
    }
    render(){
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                ? <span>欢迎，{this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.onLogout(this.state.username)}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavTop;