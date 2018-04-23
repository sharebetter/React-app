import React from 'react';

class TableList extends React.Component {
    constructor (props) {
       super(props);
    }
    render () {
        let infoList = this.props.list.map((ele,index)=>{
            // console.log(ele,index)
            return (<tr key={index}>
                <th scope="row">{ele.id}</th>
                <td>{ele.username}</td>
                <td>{ele.email}</td>
                <td>{ele.phone}</td>
                <td>{new Date(ele.createTime).toLocaleString()}</td>
            </tr>)
        })
        return (
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>用户名</th>
                            <th>邮箱</th>
                            <th>电话</th>
                            <th>注册时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infoList}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TableList;