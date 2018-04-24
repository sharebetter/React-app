import MUtil        from 'util/ajax.jsx'

const _mm   = new MUtil();

class ProductServer{
    getProductList(params){
        let url  = '/manage/product/list.do';
        let data = {};
        if(params.listType === 'search'){
            url = '/manage/product/search.do';
            data[params.searchType] = params.keywords
        }else{
            data.pageNum = params.pageNum;
        }
        return _mm.request({
            type : 'post',
            url  : url,
            data : data
        });
    }
    setProductStatus (productInfo) {
        return _mm.request({
            type : 'post',
            url  : '/manage/product/set_sale_status.do',
            data :productInfo
        });
    }

    alertTips (msg) {
        alert(msg);
    }
}

export default ProductServer;