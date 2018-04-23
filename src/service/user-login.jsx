import Mutil from 'util/ajax.jsx';
let _mm =  new Mutil();
class User{
    login(userInfo){
        return _mm.request({
            type:'post',
            url:'/manage/user/login.do',
            data:userInfo
        })
    }

    checkUserInput (userInput) {
        let username = $.trim(userInput.username),
            password = $.trim(userInput.password),
            status   = 0,
            msg      = '';
        if(typeof username !=='string' || username.length===0){
           status = 1;
           msg    = '用户名格式错误！'
        }
        else if(typeof password !=='string' || password.length===0){
           status = 2;
            msg   = "密码格式错误！"
        }
        let checkInfo = {
            status:status,
            msg : msg
        }
        return checkInfo;
    }
    errorTips (msg) {
        alert(msg)
    }
    setItem (username) {
        if(typeof username ==='object'){
            window.localStorage.setItem('username',JSON.stringify(username));
        }
        else if(['string','number','boolean'].indexOf (typeof username) >= 0){
            window.localStorage.setItem('username',username);
        }else{
            alert('该类型不能用于本地存储！')
        }
    }
    getItem (username) {
        let user = window.localStorage.getItem(username);
        if(user){

        }else{
            user = '';
        }
        return user;
    }
    removeItem (username) {
        window.localStorage.removeItem(username);
    }
    logOut (username) {
       return _mm.request({
            type:'post',
            path:'/user/logout.do',
            data:{
                username:username
            }
       })
    }
}
export default User;