import React       from 'react';
import { Link }    from 'react-router-dom';
import MUtil       from 'util/ajax.jsx';
import Product        from 'service/product-service.jsx';
import PageTitle   from 'component/page-title/index.jsx';
import TableList   from 'util/tableList/index.jsx';
import './index.scss';
const _mm   = new MUtil();
const _product = new Product();

class ProductList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            list                : [],
            parentCategoryId    : this.props.match.params.categoryId || 0
        };
    }

    componentDidMount(){
        this.loadCategoryList();
    }
    // 重新渲染该页面时触发
    componentDidUpdate(prevProps, prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId || 0;
            console.log(prevProps, prevState)
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            }, () => {
                this.loadCategoryList();
            });
        }
    }
    loadCategoryList () {
        _product.getCategoryList(this.state.parentCategoryId).then(result => {
            if(result.status === 0){
                let res = result.data;
                this.setState({
                    list:res
                })
            }
        },error => {
            _product.alertTips(error.msg);
        })
    }
    onUpdateName (categoryId,categoryName) {
        let newName = window.prompt('请输入新的品类名称', categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName : newName
            }).then(res => {
                _product.alertTips(res.data);
                this.loadCategoryList();
            }, errMsg => {
                _product.alertTips(errMsg.data);
            });
        }
    }

    render () {
        let thList = ['品类ID','品类名称','操作'];
        let tb_thList = thList.map(
            (ele,index)=>{
                return  <th key={index}>{ele}</th>
            }
        )
        console.log(this.state.parentCategoryId,'666')

        return (
            <div id="page-wrapper">
               <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to={`/product-category/add/${this.state.parentCategoryId}`} className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
               </PageTitle>
               <div className="col-md-12">
                    <TableList thList={tb_thList}>
                        {
                            this.state.list.map((ele,index)=>{
                                return (<tr key={index}>
                                    <th scope="row">{ele.id}</th>
                                    <td>{ele.name}</td>
                                    <td>
                                        <a className="opera"
                                            onClick={(e) => this.onUpdateName(ele.id, ele.name)}>修改名称</a>
                                        {
                                            ele.parentId === 0
                                            ? <Link to={`/product-category/index/${ele.id}`}>查看子品类</Link>
                                            : null
                                        }
                                    </td>
                                </tr>)
                            })
                        }
                    </TableList>
               </div>
            </div>
        )
    }
}
export default ProductList;