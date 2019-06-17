const products=[];

exports.getAddProduct =(req,res,next)=>{
    res.render('add-product',{
        pageTitle:'Add Product',
        path: '/product'
    });
};


exports.postAddProducts = (req,res,next)=>{
    products.push({title:req.body.title});
    res.redirect('/display');
};

exports.getProducts=(req,res,next)=>{
    console.log("haha")
    res.render('shop',{
        prods: products,
        pageTitle:'Shop',
        path:'/display',
        hasProducts:products.length>0
    });
};