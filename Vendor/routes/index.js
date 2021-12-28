var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Formidable = require('formidable');
const cloudinary = require("cloudinary");
require('dotenv').config("../.env");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


router.get('/', async (req, res) => {
  if (req.user && req.user.isVerified) {
    const orders = await Order.find({});
    var data = [];
    var temp = {};
    for (let order of orders) {
      for (let prod of order.bill) {
        temp = {};
        temp.orderid = order._id;
        temp.productid = prod.productid;

        var ven = await Product.findOne({ _id: mongoose.Types.ObjectId(prod.productid) });
        if (ven.vendor.toString() == req.user._id.toString()) {
          if (prod.isArrived == true) {
            temp.sent = true;
          }
          else {
            temp.sent = false;
          }


          temp.pay = "Online Payment";
          if (order.paymentMethod == "COD") {
            temp.pay = "Cash-On-Delivery";
          }
          temp.time = `` + order.time + ``;
          temp.count = prod.count;
          data.push(temp);
          temp = {};
        }
      }
    }

    res.render('index', { data: data });
  }
  else if (req.user && !req.user.isVerified) {
    res.render('verified');
  }
  else {
    res.redirect('/users/login');
  }
});


router.get('/addproducts', async (req, res) => {
  if (req.user && req.user.isVerified) {
    res.render('addproducts');
  }
  else {
    res.redirect('/users/logout');
  }
});

router.post('/addproducts', async (req, res) => {
  if (req.user && req.user.isVerified) {
    const form = Formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      cloudinary.uploader.upload(files.imgfile.filepath, async (result) => {

        var newProd = new Product({
          name: fields.name,
          model: fields.model,
          description: fields.desc,
          category: fields.cat,
          image: result.secure_url,
          price: fields.price,
          quantity: fields.quantity,
          vendor: req.user._id
        });

        await newProd.save();
        res.redirect('/addproducts');
      });
    });
  }
  else {
    res.redirect('/users/logout');
  }
});


router.get('/updatestock', async (req, res) => {
  if (req.user && req.user.isVerified) {
    res.render('updatestock');
  }
  else {
    res.redirect('/users/logout');
  }
});

router.post('/updatestock', async (req, res) => {
  if (req.user && req.user.isVerified) {
    await Product.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.upd), vendor: req.user._id }, { quantity: req.body.qant })
    res.redirect('/updatestock');
  }
  else {
    res.redirect('/users/logout');
  }
});


router.get('/deleteproducts', async (req, res) => {
  if (req.user && req.user.isVerified) {
    res.render('deleteproducts');
  }
  else {
    res.redirect('/users/logout');
  }
});

router.post('/deleteproducts', async (req, res) => {
  if (req.user && req.user.isVerified) {
    await Product.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.body.delete), vendor: req.user._id });
    res.redirect('/deleteproducts');
  }
  else {
    res.redirect('/users/logout');
  }
});


router.get('/dispatch/:oid/:pid', async (req, res) => {
  if (req.user && req.user.isVerified) {
    var order = await Order.findOne({ _id: mongoose.Types.ObjectId(req.params.oid) });
    for (let prod of order.bill) {
      if (prod.productid.toString() == req.params.pid) {
        prod.isArrived = true;
      }
    }
    await order.save();
    res.redirect('/');
  }
  else {
    res.redirect('/users/logout');
  }
});




module.exports = router;
