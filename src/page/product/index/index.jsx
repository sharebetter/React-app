import React       from 'react';
import { Link }    from 'react-router-dom';
import MUtil       from 'util/ajax.jsx';
import Product     from 'service/product-service.jsx';
import PageTitle   from 'component/page-title/index.jsx';
import Pagination  from 'util/pagination/index.jsx';
import TableList   from 'util/tableList/index.jsx';
import FormSelect  from 'component/form-search/index.jsx';
import './index.scss';
const _product =  new Product();
class ProductList extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            pageNum:1,
            total:200,
            list:[],
            thList:[],
            listType:'list',
            listData:'',
        }
    }
    loadProductList (pageNum = this.state.pageNum) {
        let params = {
            listType    : this.state.listType,
            keywords    : this.state.listData.keywords,
            searchType  : this.state.listData.selectType,
            pageNum     : pageNum
        };
        _product.getProductList(params).then(res=>{
            if(res.status == 0){
                this.setState({
                    list:res.data.list
                 })
                 let thList = [];
                 for (let i in res.data.list[0]){
                     thList.push(i);
                 }
                 this.setState({
                     thList,
                     listType:'list',
                     listData : ''
                 })
            }
        })

    }
    pageChange (pageNum) {
        this.setState({
            pageNum
        })
        this.loadProductList(pageNum);
    }
    componentDidMount () {
        this.loadProductList();
    }
    changeStatus (productId,status) {
        let confimTips = status == 1 ? '你确认要下架该商品吗？':'你确认要上架该商品吗？'
        if(window.confirm(confimTips)){
            let newStatus   = status == 1 ? 2 : 1;
            let productInfo = {
                productId,
                status:newStatus
            }
            this.setProductStatus(productInfo);
        }
    }
    setProductStatus (productInfo) {
        _product.setProductStatus(productInfo).then(
            (res)=>{
                _product.alertTips(res.data);
                this.loadProductList();
            },(err)=>{
                _product.alertTips(err);
            }
        )
    }
    //子向父组件传值
    doSearch (searchValue) {
        if(searchValue.keywords.length>0){
            // 在 setState 中设置回调，
            // 防止state还没设置成功就执行loadProductList函数，导致state值取不到
            this.setState({
                listType :'search',
                listData : searchValue
            },()=>{
                this.loadProductList();
            })
        }else{
            this.setState({
                listType :'list',
                listData : ''
            },()=>{
                this.loadProductList();
            })
        }
    }
    render (){
        let tb_thList = this.state.thList.map((ele,index)=>{
            return <th key={index}>{ele}</th>
        })
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <div className="col-md-12">
                   <FormSelect getSearchValue={this.doSearch.bind(this)}></FormSelect>
                   <TableList thList={tb_thList}>
                        {
                            this.state.list.map((ele,index)=>{
                                return (<tr key={index}>
                                    <th scope="row">{ele.id}</th>
                                    <td>{ele.categoryId}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.subtitle}</td>
                                    <td>{ele.mainImage}</td>
                                    <td>${ele.price}</td>
                                    <td>
                                        <p>{ele.status == 1 ? '在 售':'已下架'}</p>
                                        <button className="btn btn-warning btn-xs" onClick={this.changeStatus.bind(this,ele.id,ele.status)}>{ele.status == 1 ? '下架':'上架'}</button>
                                    </td>
                                    <td>{ele.imageHost}</td>
                                    <td>
                                        <Link className="opera" to={`/product/detail/${ele.id}`}>商品详情</Link>
                                        <Link className="opera" to={`/product/edit/${ele.id}`}>编辑</Link>
                                    </td>
                                </tr>)
                            })
                        }
                    </TableList>
                </div>
                <Pagination current={this.state.pageNum} showQuickJumper total={this.state.total} onChange={this.pageChange.bind(this)}/>
            </div>
        )
    }
}
export default ProductList;