const { validationResult } = require("express-validator");

const mongodb = require("mongodb");
const Product = require("../models/products");
const ObjectId = mongodb.ObjectId;

exports.home = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('products/search', {
        pageTitle: "home",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.detail = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('products/detail', {
        pageTitle: "detail",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.cart = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('products/cart', {
        pageTitle: "cart",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSearchProduct = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("products/edit", {
        pageTitle: "edit Product",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddProduct = (req, res, next) => {
  const category_name = "";
  const product_name = "";
  const price = "";
  const amount = "";
  const description = "";
  const img_path = "";
  res.render("products/insert", {
    pageTitle: "Insert Product",
    errorMessage: null,
    category_name: category_name,
    product_name: product_name,
    price: price,
    amount: amount,
    description: description,
    img_path: img_path,
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const {
    category_name,
    product_name,
    price,
    amount,
    description,
    img_path,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("products/insert", {
      pageTitle: "Insert Product",
      errorMessage: errors.array(),
      category_name: category_name,
      product_name: product_name,
      price: price,
      amount: amount,
      description: description,
      img_path: img_path,
    });
  }

  const product = new Product(
    category_name,
    product_name,
    price,
    amount,
    description,
    img_path
  );
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/edit");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUpdateProduct = (req, res, next) => {
  console.log(req.params);
  const { product_id } = req.params;
  let category_name = "";
  let product_name = "";
  let price = "";
  let amount= "";
  let description= "";
  let img_path= "";

  Product.findById(product_id)
    .then((product) => {
      console.log(product);
      product_name = product.product_name;
      price = product.price;
      res.render("products/update", {
        pageTitle: "Update Product",
        errorMessage: null,
        product_id: product_id,
        category_name: category_name,
        product_name: product_name,
        price: price,
        amount: amount,
        description: description,
        img_path: img_path,
       
      });
    })
    .catch((err) => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
  console.log(req.body);
  const { product_id, category_name,product_name, price,amount,description,img_path } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("products/update", {
      pageTitle: "Update Product",
      errorMessage: errors.array(),
      product_id: product_id,
      category_name: category_name,
      product_name: product_name,
      price: price,
      amount: amount,
      description: description,
      img_path: img_path,
    });
  }

  const product = new Product( category_name,product_name, price,amount,description,img_path, new ObjectId(product_id));
  product
    .save()
    .then((result) => {
      console.log("Update Product");
      res.redirect("/products/search");
    })
    .catch((err) => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
  const { product_id } = req.params;
  console.log(product_id);
  Product.deleteById(product_id)
    .then(() => {
      console.log("Delete Product");
      res.redirect("/edit");
    })
    .catch((err) => console.log(err));
};
