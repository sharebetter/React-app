import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import ProductList      from 'page/product/index/index.jsx';
import ProductEdit      from 'page/product/index/edit.jsx';
import ProductDetail    from 'page/product/index/detail.jsx';
class ProductRoute extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}></Route>
                <Redirect exact from="/product" to="/product/index" ></Redirect>
                <Route exact path="/product/edit/:pid?" component={ProductEdit}></Route>
                <Route exact path="/product/detail/:pid" component={ProductDetail}></Route>
            </Switch>
        )
    }
}

export default ProductRoute;