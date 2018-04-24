import React from 'react';

class TableList extends React.Component {
    constructor (props) {
       super(props);
       this.state = {
        isFirstLoading: true
       }
    }
    componentWillReceiveProps(){
        // 列表只有在第一次挂载的时候，isFirstLoading为true，其他情况为false
        if(this.props.children.length>0){
            this.setState({
                isFirstLoading : false
            });
        }
    }
    render () {
        // 列表内容
        let listBody = this.props.children;
        // 列表的信息
        let listInfo = (
            <tr>
                <td colSpan={this.props.thList.length} className="text-center">
                    {this.state.isFirstLoading ? '正在加载数据...':'没有找到相应的结果~'}</td>
            </tr>
        );
        let tableBody = listBody.length > 0 ? listBody : listInfo;

        // console.log(this.props.thList)
        return (
            <div>
                <table className="table table-striped table-hover text-center table-bordered">
                    <thead>
                        <tr>
                            {
                                this.props.thList
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TableList;