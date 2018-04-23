import MUtil        from 'util/ajax.jsx'

const _mm   = new MUtil();

class UserService{
    getUserList(pageNum){
        return _mm.request({
            url     : '/manage/user/list.do',
            data    : {
                pageNum : pageNum
            }
        });
    }
    errorTips (msg) {
        alert(msg);
        console.log(msg);
    }
}

export default UserService;