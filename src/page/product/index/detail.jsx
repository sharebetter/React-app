import React           from 'react';
import PageTitle       from 'component/page-title/index.jsx';
import CategorySelect  from 'component/category-select/index.jsx';
import FileUploader    from 'util/file-uploader/index.jsx';
import MUtil           from 'util/ajax.jsx';
import Product         from 'service/product-service.jsx';
import RichEditor      from 'util/rich-editor/index.jsx';
const _product =  new Product();
class ProductDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id                  : this.props.match.params.pid,
            name                : '',
            subtitle            : '',
            categoryId          : 0,
            parentCategoryId    : 0,
            subImages           : [],
            price               : '',
            stock               : '',
            detail              : '',
            status              : 1 //商品状态1为在售
        }
    }
    componentWillMount () {
        this.loadProduct();
    }
    // 加载商品详情
    loadProduct(){
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id){
            _product.getProduct(this.state.id).then((result) => {
                let res = result.data;
                console.log(res)
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                this.setState(res);
            }, (errMsg) => {
                _product.alertTips(errMsg);
            });
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="商品详情" />
                <div className="col-md-12">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label  className="col-sm-2 control-label">商品名称</label>
                            <div className="col-md-5">
                            {/* form-control-static设置为只读 */}
                                <p className="form-control-static">{this.state.name}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-sm-2 control-label">商品描述</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.subtitle}</p>
                            </div>
                        </div>
                        <CategorySelect
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        />
                        <div className="form-group">
                            <label  className="col-sm-2 control-label">商品价格</label>
                            <div className="col-md-2">
                                <div className="input-group">
                                    <input type="number" className="form-control"  readOnly placeholder="价格"
                                        name="price"    value={this.state.price}
                                    />
                                    <span className="input-group-addon">元</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-sm-2 control-label">商品库存</label>
                            <div className="col-md-2">
                                <div className="input-group">
                                    <input type="number" className="form-control" readOnly placeholder="库存"
                                         name="stock"   value={this.state.stock}
                                    />
                                    <span className="input-group-addon">件</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品图片</label>
                            <div className="col-md-10">
                                {
                                    this.state.subImages.length ? this.state.subImages.map(
                                        (image, index) => (
                                        <div className="img-con" key={index}>
                                            <img className="img" src={image.url} />
                                            <i className="fa" index={index} ></i>
                                        </div>)
                                    ) : (<div>暂无图片</div>)
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品详情</label>
                            <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;