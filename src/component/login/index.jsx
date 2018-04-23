/*
* @Author: Rosen
* @Date:   2018-01-23 22:18:41
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-23 22:26:09
*/
import React from 'react';
import 'component/login/index.scss';
import User from 'service/user-login.jsx';
let _user = new User();
import Mutil from 'util/ajax.jsx';
let _mm =  new Mutil();
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            redirect:_mm.catchPath()
        }
    }
    componentWillMount () {
        document.title = 'login';
    }
    userIptChange (e) {
      let inputName = e.target.name;
      let inputValue = e.target.value;
    //   console.log(inputName,inputValue)
      this.setState({
          [inputName]:inputValue
      })
    }
    onSubmit () {
        let checkResult = _user.checkUserInput({
            username:this.state.username,
            password:this.state.password
          });
        if(checkResult.status === 0){
            _user.login({
                username:this.state.username,
                password:this.state.password
            }).then((res)=>{
                 this.props.history.push('/');
                //  console.log(typeof res.data.username)
                 _user.setItem(res.data.username);
            },(err)=>{});
        }else{
            _user.errorTips(checkResult.msg);
        }
    }
    onKeydown (e) {
        if(e.keyCode === 13){
           this.onSubmit ();
        }
    }
    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
                    <div className="panel-body">
                        <div onKeyDown={this.onKeydown.bind(this)}>
                            <div className="form-group">
                                <input type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="请输入用户名"
                                    onChange ={this.userIptChange.bind(this)}
                                   />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="请输入密码"
                                    onChange ={this.userIptChange.bind(this)}
                                    />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={this.onSubmit.bind(this)}
                                >登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;