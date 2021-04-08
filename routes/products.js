const express = require("express");

const { check } = require("express-validator");
const router = express.Router();

const productsController = require("../controllers/products");
// const productsController = require("../controllers/order");
router.get("/", productsController.home);
router.get("/edit", productsController.getSearchProduct);
router.get("/insert", productsController.getAddProduct);
router.get("/cart", productsController.cart);
router.get("/update/:product_id", productsController.getUpdateProduct);
router.post('/category', productsController.selectCategory);
router.post('/addOrder', productsController.postAddOrder);
router.get("/:product_id", productsController.detail);


// /admin/add-product => GET
// router.get("/edit", productsController.getSearchProduct);



// router.get("/update/:product_id", productsController.getUpdateProduct);

// router.post('/category', productsController.selectCategory);

// /admin/add-product => POST
router.post(
  "/insert",
  [
    check("product_name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("product name is required"),
    check("price").isFloat({ gt: 0 }).withMessage("greater than zero"),
  ],
  productsController.postAddProduct
);

router.post(
  "/update",
  [
    check("product_id").not().isEmpty().withMessage("empty"),
    check("product_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("product name is required"),
    check("price").isFloat({ gt: 0 }).withMessage("greater than zero"),
  ],
  productsController.postUpdateProduct
);

router.get("/delete/:product_id", productsController.getDeleteProduct);
router.get("/deleteorder/:order_id", productsController.getDeleteOrders);

exports.routes = router;
