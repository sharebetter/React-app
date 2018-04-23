import React from "react";
import NavSide from 'component/nav-side/index.jsx';
import NavTop from 'component/nav-top/index.jsx';
import './theme.css';
// import './index.scss';
class Layout extends React.Component{
    constructor (props) {
        super(props)
    }
    render(){
        return (<div id="wrapper">
        <NavTop/>
        <NavSide></NavSide>
        {this.props.children}
        </div>)
    }
}
export default Layout;