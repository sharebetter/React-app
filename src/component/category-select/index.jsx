import React from 'react';
import './index.scss';
import MUtil       from 'util/ajax.jsx';
import Product     from 'service/product-service.jsx';

const _product =  new Product();
class CategorySelect extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            firstCategoryList:[],
            firstCategoryId:0,
            secondCategoryList:[],
            secondCategoryId:-1,
        }
    }
    componentDidMount () {
        this.loadFirstCategory ();
    }
    //父组件传的props改变时促发
    componentWillReceiveProps(nextProps){
        // console.log('1')
        let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
            // console.log(this.props.parentCategoryId,nextProps.parentCategoryId,'2222')
        // 数据没有发生变化的时候，直接不做处理
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        // 假如只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId     : nextProps.categoryId,
                secondCategoryId    : 0
            });
        }
        // 有两级品类
        else{
            this.setState({
                firstCategoryId     : nextProps.parentCategoryId,
                secondCategoryId    : nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory();
                // console.log(this.state.firstCategoryId,this.state.secondCategoryId)
            });

        }
    }
    loadFirstCategory () {
        _product.getCategoryList().then((res)=>{
            this.setState({
                firstCategoryList:res.data
            },()=>{
                this.setState({
                    // firstCategoryId : 0,
                    // secondCategoryList:[],
                    // secondCategoryId:-1,
                })
            })
        },error => {
            _product.alertTips('error');
        })

    }
    // 加载二级分类
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList : res.data
            });
        }, errMsg => {
            _product.alertTips(errMsg);
        });
    }
    firstCategoryChange (e) {
        if(this.props.readOnly){
            return;
        }
        let categorySelect = e.target.value;
        this.setState({
            firstCategoryId : categorySelect,
            secondCategoryList:[],
            secondCategoryId:-1,
        })
        if(categorySelect != 0){
            _product.getCategoryList(categorySelect).then((res)=>{
                this.setState({
                    secondCategoryList:res.data
                },()=>{
                    if(res.data.length>0){
                        this.setState({
                            secondCategoryId:res.data[0].id,
                        },()=>{
                            this.onPropsCategoryChange()
                        })
                    }else{
                        this.onPropsCategoryChange()
                    }

                })
            },error => {
                _product.alertTips('error');
            })
        }else{
            this.setState({
                firstCategoryId: 0
            },()=>{
                this.onPropsCategoryChange();
            })
        }
    }
    secondCategoryChange (e) {
        if(this.props.readOnly){
            return;
        }
        let secondCategorySelect = e.target.value;
        this.setState({
            secondCategoryId : secondCategorySelect,
        },()=>{
            this.onPropsCategoryChange()
        })
    }
    onPropsCategoryChange () {
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';
        if(categoryChangeable) {
            if(this.state.secondCategoryId>-1){
                this.props.onCategoryChange(this.state.firstCategoryId,this.state.secondCategoryId);
            }else{
                this.props.onCategoryChange(this.state.firstCategoryId)
            }
        }
    }
    render() {
        // console.log(this.state.firstCategoryId,this.state.secondCategoryId)
        return (
            <div className="form-group">
                <label className="col-sm-2 control-label">所属分类</label>
                <div className="col-md-10">
                    <select className="form-control category-col col-md-4"
                    value={this.state.firstCategoryId} onChange={this.firstCategoryChange.bind(this)}>
                        <option value="0">请选择一级分类</option>
                        {
                            this.state.firstCategoryList.map((ele,index)=>{
                                return <option value={ele.id} key={index}>{ele.name}</option>
                            })
                        }
                    </select>
                    {
                        this.state.secondCategoryList.length>0
                        ?  (<select className="form-control category-col col-md-4" value={this.state.secondCategoryId} onChange={this.secondCategoryChange.bind(this)}>
                                {
                                    this.state.secondCategoryList.map((ele,index)=>{
                                        return <option value={ele.id} key={index}>{ele.name}</option>
                                    })
                                }
                            </select>)
                        :null
                    }
                </div>
            </div>
        )
    }
}
export default CategorySelect;