
import productModel from "../model/productModel.js"
import categoryModel from "../model/categoryModel.js";
import orderModel from "../model/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

// getway payment
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// ptoduct controller api
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required less then 1mb" });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      sucess: true,
      message: "product create sucessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error creating product",
    });
  }
};

// get all product api
export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(15)
      .sort({ createdAt: -1 });
    res.status(200).send({
      sucess: true,
      countTotal: product.length,
      message: "All Product",
      product,
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "error in getting product",
      error: error.message,
    });
  }
};

// get single product api
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ _id: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      sucess: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error in single product",
      error: error.message,
    });
  }
};

// get photo api
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);

      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while getting photo",
      error,
    });
  }
};

// delete controller api
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");

    res.status(200).send({
      sucess: true,
      message: "product delete sucessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      error,
      message: "error on delete product",
    });
  }
};

// update product api
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required less then 1mb" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      sucess: true,
      message: "product updating sucessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      error,
      message: "error updating product",
    });
  }
};

// Filter Product api

export const ProductFilterController = async (req, res) => {
  try {
    const { radio, checked } = req.body;
    let filt = {};
    if (radio.length) filt.price = { $gte: radio[0], $lte: radio[1] };
    // greater then equal,less then equal
    if (checked.length > 0) filt.category = checked;
    const product = await productModel.find(filt);
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while in filter Products",
      error,
    });
  }
};

// product count api

export const ProductCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in Product Count",
      error,
      success: false,
    });
  }
};

// product list on page

export const ProductListController = async (req, res) => {
  try {
    const perpage = 2;
    const page = req.params.page ? req.params.page : 1;
    const product = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in per page list",
      success: false,
      error,
    });
  }
};
// Search Product api

export const SearchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in search product API",
      success: false,
      error,
    });
  }
};

// related Product api
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const product = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(2)
      .populate("category");
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error while geting  related product",
      success: false,
      error,
    });
  }
};

// product wise category api

export const ProductCategoryContoller = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const product = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while gitting on product",
      error,
    });
  }
};

// gateway payment api for token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// payment api
export const braintreePaymentController = async (req, res) => {
  try {
    // (api from braintree)
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            product: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
