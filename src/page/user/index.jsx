import React       from 'react';
import { Link }    from 'react-router-dom';
import MUtil       from 'util/ajax.jsx';
import User        from 'service/user-service.jsx';
import PageTitle   from 'component/page-title/index.jsx';
import Pagination  from 'util/pagination/index.jsx';
import TableList   from 'util/tableList/index.jsx';

const _mm   = new MUtil();
const _user = new User();

class UserList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            pageNum : 1,
            total:200,
            list:[],
        }
    }
    pageChange (pageNum) {
        // console.log(pageNum)
        this.setState({
            pageNum
        })
        this.loadUserList(pageNum);
    }
    loadUserList (pageNum=this.state.pageNum) {
        // console.log(pageNum)
        _user.getUserList(pageNum).then(res => {
            // console.log(res)
            this.setState({
                list:res.data.list,
                pageNum:pageNum,
                total:res.data.total,
            });
            // console.log(this.state.list)
        }, errMsg => {
            this.setState({
                list : []
            });
            _user.errorTips(errMsg);
        });
    }
    componentDidMount(){
        this.loadUserList();
    }
    render () {
        let thList = ['id','用户名','邮箱','电话','注册时间'];
        let tb_thList = thList.map(
            (ele,index)=>{
                return  <th key={index}>{ele}</th>
            }
        )

        return (
            <div id="page-wrapper">
               <PageTitle title="用户列表" />
               <div className="col-md-12">
                    <TableList thList={tb_thList}>
                        {
                            this.state.list.map((ele,index)=>{
                                // console.log(ele,index)
                                return (<tr key={index}>
                                    <th scope="row">{ele.id}</th>
                                    <td>{ele.username}</td>
                                    <td>{ele.email}</td>
                                    <td>{ele.phone}</td>
                                    <td>{new Date(ele.createTime).toLocaleString()}</td>
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
export default UserList;