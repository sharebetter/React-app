import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import ProductList      from 'page/product/index/index.jsx'
class ProductRoute extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}></Route>
                <Redirect exact from="/product" to="/product/index" ></Redirect>
            </Switch>
        )
    }
}

export default ProductRoute;