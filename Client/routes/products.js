var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Razorpay = require('razorpay');
require('dotenv').config('../.env');

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.render('products', { title: 'Products', data: products });
});


router.get('/view/:id', async (req, res) => {
  if (!req.user) {
    res.redirect('/users/login');
  }
  else {
    const product = await Product.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    var flag = 0;
    for (i = 0; i < product.reviews.length; i++) {
      if (product.reviews[i].ofUser.toString() == req.user._id.toString()) {
        flag = 1;
        break;
      }
    }
    if (flag == 0)
      res.render('viewprod', { title: 'View Product', data: product, id: product._id, notreview: 1 });
    else
      res.render('viewprod', { title: 'View Product', data: product, id: product._id });
  }
});


router.post('/addreview', async (req, res) => {
  var product = await Product.findOne({ _id: mongoose.Types.ObjectId(req.body.prodid) });
  var temp = product.reviews;
  temp.push({
    ofUser: req.user._id,
    userName: req.user.name,
    comment: req.body.review,
    createdAt: new Date(),
    rating: req.body.rating
  });
  product.reviews = temp;
  var sum = 0;
  var count = 0;
  for (i = 0; i < product.reviews.length; i++) {
    count++;
    sum += product.reviews[i].rating;
  }
  product.rating = Math.ceil(sum / count);
  await product.save();
  res.redirect('/products/view/' + req.body.prodid);
});

router.get('/deletereview/:id', async (req, res) => {
  console.log(req.params.id);
  var product = await Product.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
  var temp = [];
  var sum = 0;
  var count = 0;
  for (i = 0; i < product.reviews.length; i++) {
    if (product.reviews[i].ofUser.toString() == req.user._id.toString()) {
      continue;
    }
    temp.push(product.reviews[i]);
    count++;
    sum += product.reviews[i].rating;
  }
  product.reviews = temp;
  if (count == 0) {
    count = 1;
  }
  product.rating = Math.ceil(sum / count);
  await product.save();
  res.redirect('/products/view/' + req.params.id);
});


router.get('/addtocart/:id', async (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  }
  else {
    const pid = req.params.id;
    const available = await Cart.findOne({ productid: mongoose.Types.ObjectId(pid), userid: req.user._id });
    if (available) {
      await Cart.findOneAndUpdate({ productid: mongoose.Types.ObjectId(pid) }, { count: available.count + 1 });
    }
    else {
      var newCart = new Cart({
        userid: req.user._id,
        productid: mongoose.Types.ObjectId(pid)
      })
      await newCart.save();
    }

    res.redirect('/products');
  }
});

router.get('/updatecount/:id/:action', async (req, res) => {
  var items = await Cart.findOne({ userid: req.user._id, productid: mongoose.Types.ObjectId(req.params.id) });
  if (req.params.action == "add")
    await Cart.findOneAndUpdate({ userid: req.user._id, productid: mongoose.Types.ObjectId(req.params.id) }, { count: items.count + 1 });
  else {
    if (items.count == 1) {
      await Cart.findOneAndRemove({ userid: req.user._id, productid: mongoose.Types.ObjectId(req.params.id) });
    }
    else {
      await Cart.findOneAndUpdate({ userid: req.user._id, productid: mongoose.Types.ObjectId(req.params.id) }, { count: items.count - 1 });
    }
  }
  res.redirect('/products/cart');
});


router.get('/cart', async (req, res) => {
  if (!req.user) {
    res.redirect('/');
  }
  else {
    const items = await Cart.find({ userid: req.user._id });
    var data = [];
    var sub = 0.0;
    for (let item of items) {
      var product = await Product.findOne({ _id: mongoose.Types.ObjectId(item.productid) });
      var temp = {};
      temp.image = product.image;
      temp.name = product.name;
      temp.model = product.model;
      temp.price = product.price;
      temp.count = item.count;
      temp.id = product._id;
      sub += product.price * item.count;

      data.push(temp);
    }
    var ship = 0;
    if (sub > 2000.0 || sub == 0.0) {
      ship = 0.0;
    }
    else {
      ship = 200.0;
    }
    res.render('cart', { title: 'EZ-Shopping - Cart', items: data, subtotal: sub.toFixed(2), shipping: ship.toFixed(2), tax: (0.05 * sub).toFixed(2), totalcost: (1.05 * sub + ship).toFixed(2) });
  }
})

router.get('/checkpromo/:val', async (req, res) => {
  const promo = await Promo.findOne({ name: req.params.val, expiresAt: { $gt: new Date() } });
  if (!promo) {
    res.status(200).send("no");
  }
  else {
    res.status(200).send(promo.name + " " + promo.discount);
  }
});



router.get('/checkout', async (req, res) => {
  if (!req.user) {
    res.redirect('/');
  }
  else {
    const items = await Cart.find({ userid: req.user._id });
    var data = [];
    var sub = 0.0;
    for (let item of items) {
      var product = await Product.findOne({ _id: mongoose.Types.ObjectId(item.productid) });
      var temp = {};
      temp.image = product.image;
      temp.name = product.name;
      temp.model = product.model;
      temp.price = product.price;
      temp.count = item.count;
      temp.id = product._id;
      sub += product.price * item.count;

      data.push(temp);
    }
    var ship = 0;
    if (sub > 2000.0 || sub == 0.0) {
      ship = 0.0;
    }
    else {
      ship = 200.0;
    }
    res.render('checkout', { title: 'EZ-Shopping - Checkout', num: items.length, items: data, subtotal: sub.toFixed(2), shipping: ship.toFixed(2), tax: (0.05 * sub).toFixed(2), totalcost: (1.05 * sub + ship).toFixed(2) });
  }
});


router.post('/placeorder', async (req, res) => {
  if (!req.user) {
    res.redirect('/users/login');
  }
  else {
    var arr = []
    const items = await Cart.find({ userid: req.user._id });
    var sub = 0.0;
    for (let item of items) {
      var product = await Product.findOne({ _id: mongoose.Types.ObjectId(item.productid) });
      sub += product.price * item.count;
      arr.push({
        productid: product._id,
        count: item.count,
        isArrived: false
      });
    }
    var ship = 0;
    if (sub > 2000.0 || sub == 0.0) {
      ship = 0.0;
    }
    else {
      ship = 200.0;
    }
    if (req.body.promoname != "NA") {
      var promo = await Promo.findOne({ name: req.body.promoname });
      sub = (1 - (Number(promo.discount) / 100)) * sub;
    }
    var pay = req.body.paymentMethod == "1" ? "RazorPay" : "COD";
    var newOrder = new Order({
      userid: req.user._id,
      shippingAddress: {
        name: req.body.name,
        email: req.body.email,
        address: {
          address_line1: req.body.address1,
          address_line2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          pincode: req.body.zip
        }
      },
      bill: arr,
      totalCost: (1.05 * sub + ship).toFixed(2),
      paymentMethod: pay,
      time: new Date(),
      specialInstructions: req.body.specinst
    });

    await newOrder.save();
    await Cart.deleteMany({ userid: req.user._id });
    res.redirect('/products/payment/' + newOrder._id);
  }
})

router.get('/payment/:id', async (req, res) => {
  if (!req.user) {
    res.redirect('/users/login');
  }
  else {
    const order = await Order.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    if (order.paymentMethod == "RazorPay") {
      res.render('payment', { title: 'Payment', totalCost: order.totalCost, orderid: order._id });
    }
    else {
      res.redirect('/products/placed');
    }
  }
});

router.post('/makepayment/:id', async (req, res) => {
  if (!req.user) {
    res.redirect('/users/login');
  }
  else {
    const order = await Order.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
    var options = {
      amount: parseInt(order.totalCost * 100),  // amount in the smallest currency unit
      currency: "INR",
      receipt: order._id.toString()
    };
    instance.orders.create(options, async (err, order) => {
      if (err) {
        console.log(err);
        res.redirect('/error');
      }
      else {
        await Order.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { isPaid: true });
        const orders = await Order.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
        for (let o of orders.bill) {
          var p = await Product.findOne({ _id: o.productid });
          await Product.findOneAndUpdate({ _id: o.productid }, { quantity: p.quantity - o.count });
        }
        res.redirect('/products/placed');
      }
    });
  }
})



router.get('/placed', async (req, res) => {
  res.render('orderplaced');
});



module.exports = router;
