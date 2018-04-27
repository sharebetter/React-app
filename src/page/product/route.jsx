import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import ProductList      from 'page/product/index/index.jsx';
import ProductEdit      from 'page/product/index/edit.jsx';
import ProductDetail    from 'page/product/index/detail.jsx';
import CategoryList     from 'page/product/category/index.jsx';
import CategoryAdd     from 'page/product/category/add.jsx';
class ProductRoute extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}></Route>
                <Redirect exact from="/product" to="/product/index" ></Redirect>
                <Route exact path="/product/edit/:pid?" component={ProductEdit}></Route>
                <Route exact path="/product/detail/:pid" component={ProductDetail}></Route>
                <Route path="/product-category/index/:categoryId?" component={CategoryList}></Route>
                <Route path="/product-category/add/:categoryId?" component={CategoryAdd}></Route>
                <Redirect exact from="/product-category" to="/product-category/index" ></Redirect>
            </Switch>
        )
    }
}

export default ProductRoute;