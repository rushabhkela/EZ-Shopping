var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');


router.get('/', async (req, res) => {
  if (req.user) {
    res.render('index', { title: "EZ-Shopping Admin" });
  }
  else {
    var admins = await Admin.find()
    if (admins.length == 0) {
      res.render('register', { title: "EZ-Shopping Admin" })
    }
    else {
      res.render('login', { title: "EZ-Shopping Admin" })
    }
  }
});

router.post('/createadmin', async (req, res) => {
  var admins = await Admin.find()
  if (admins.length == 0) {
    var newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email
    });

    await newAdmin.save();
    newAdmin.setPassword(req.body.pwd);
    await newAdmin.save();
    res.redirect('/');
  }
  else {
    res.redirect('/error');
  }
})

router.route('/login')
  .post(passport.authenticate('local', {
    failureRedirect: '/'
  }), async (req, res) => {
    res.redirect('/');
  });


router.get('/vendors', async (req, res) => {
  if (req.user) {
    const vendors = await Vendor.find({});
    res.render('vendors', { data: vendors });
  }
  else {
    res.redirect('/');
  }
});

router.get('/verify/:id', async (req, res) => {
  if (req.user) {
    await Vendor.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { isVerified: true });
    res.redirect('/vendors');
  }
  else {
    res.redirect('/');
  }
});


router.get('/remove/:id', async (req, res) => {
  if (req.user) {
    await Vendor.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) });
    res.redirect('/vendors');
  }
  else {
    res.redirect('/');
  }
});


router.get('/vieworders', async (req, res) => {
  if (req.user) {
    const orders = await Order.find({});

    var data = []
    for (let order of orders) {
      var temp = order;
      var flag = 0;
      for (let prod of order.bill) {
        if (prod.isArrived == false) {
          flag = 1;
          break;
        }
      }
      var canSend = "Yes";
      if (flag == 1) {
        canSend = "No";
      }

      temp.canSend = canSend;

      data.push(temp);
    }
    res.render('orders', { data: data });
  }
  else {
    res.redirect('/');
  }
});

router.get('/orders/:status/:id', async (req, res) => {
  if (req.user) {
    if (req.params.status == "outfordelivery") {
      await Order.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { status: "Out For Delivery" });
    }
    else if (req.params.status == "cancelled") {
      await Order.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) });
    }
    else if (req.params.status == "delivered") {
      await Order.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { status: "Delivered" });
    }
    res.redirect('/vieworders');
  }
  else {
    res.redirect('/')
  }
});


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});



module.exports = router;
