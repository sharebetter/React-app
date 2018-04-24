import React from 'react';
import './index.scss';
class formSearch extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            selectType:'productId',
            keywords:''
        }
    }
    changeValue (e) {
        // console.log(e.target.name,e.target.value)
        let selectType= $('#selectType');
        let keywords= $('#keywords');
        // console.log(keywords.val())
        if(selectType.val() === 'productId'){
            if(isNaN(Number(keywords.val())) && keywords.val().length>0){
                keywords.val('');
            }
            // console.log(isNaN(Number(keywords.val())))
        }

        let name  = e.target.name,
            value = e.target.value;
        this.setState({
            [name]:value
        })
    }
    onKeyup (e) {
       if(e.keyCode === 13){
           this.onSearch();
       }
    }
    onSearch () {
        //子向父组件传值
        this.props.getSearchValue(this.state)
    }
    render () {
        return (
            <div className="form-inline select_margin">
                <div className="form-group">
                    <select className="form-control" id="selectType" name="selectType" onChange = {this.changeValue.bind(this)}>
                        <option value="productId">按商品ID查询</option>
                        <option value="productName">按商品名称查询</option>
                    </select>
                </div>
                <div className="form-group">
                    {/* <label htmlFor="exampleInputEmail2">Email</label> */}
                    <input type="text" className="form-control" name='keywords' id="keywords" onKeyUp = {this.onKeyup.bind(this)} onChange = {this.changeValue.bind(this)} placeholder="请输入关键字" />
                </div>
                <button className="btn btn-primary" onClick={this.onSearch.bind(this)}>Search</button>
            </div>
        )
    }
}
export default formSearch;