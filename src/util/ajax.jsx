class Mutil {
    request (parm) {
        return new Promise ((resolve,reject)=>{
            let _this = this;
            $.ajax({
                url:parm.url || '',
                type:parm.type || 'get',
                dataType:'json',
                data:parm.data ||'',
                success(res){
                    if(res.status == 0){
                        resolve(res);
                    }else if(res.status == 10){
                        _this.doLogin();
                    }else{
                        reject(res)
                    }
                },
                error(err){
                  console.log(err);
                }

            })
        })
    }
    doLogin () {
        window.location.href = "/login?redirect="+encodeURIComponent(window.location.pathname);
    }
    catchPath () {
        let path    = decodeURIComponent(window.location.search.split('?')[1]);
        let dataArr = path.split('&');
        let array    = [];
        for(let i = 0; i < dataArr.length; i++){
           let data       = [];
           data           = dataArr[i].split('=');
           array[data[0]] = data[1];
        }
        return array;
    }
}

export default Mutil;