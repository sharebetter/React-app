import React            from 'react';
import ReactDOM         from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import Home             from 'page/home/index.jsx';
import Layout           from "component/layout/index.jsx";
import Login            from 'component/login/index.jsx';
import ErrorPage        from 'page/error/index.jsx';
import UserList         from 'page/user/index.jsx';
class App extends React.Component{
    render(){
        let LayoutRoute = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path='/product' component={Home}/>
                    <Route path='/product/product-category' component={Home}/>
                    <Route path="/user/index" component={UserList} />
                    <Redirect from="/user" to="/user/index"/>
                    <Route component={ErrorPage} />
                </Switch>
            </Layout>
        )
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login}></Route>
                    <Route path="/" render = { props => ( LayoutRoute ) }>

                    </Route>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);