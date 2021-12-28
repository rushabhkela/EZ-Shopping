var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var easyinvoice = require('easyinvoice');

router.route('/login')
  .get(async (req, res) => {
    res.render('login', { title: "EZ-Shopping - Login" });
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/users/login'
  }), async (req, res) => {
    res.redirect('/');
  });


router.route('/signup')
  .get(async (req, res) => {
    res.render('signup', { title: "EZ-Shopping - Create Your Account" });
  })
  .post(async (req, res) => {
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
    });

    await newUser.save();
    newUser.setPassword(req.body.password);
    await newUser.save();
    res.redirect('/users/login');
  });


router.get('/profile', async (req, res) => {
  if (!req.user) {
    res.redirect('/users/login');
  }
  else {
    res.render('userprofile', { title: 'Profile' });
  }
});


router.get('/getorders', async(req, res) => {
  const orders = await Order.find({ userid: req.user._id });
  res.status(200).json(orders);
})

router.post('/update/contact', async (req, res) => {
  await User.findOneAndUpdate({ _id: req.user._id }, { contact: req.body.contact });
  res.redirect('/users/profile');
});


router.post('/update/primaryaddress', async (req, res) => {
  var address = {
    address_line1: req.body.addline11,
    address_line2: req.body.addline21,
    city: req.body.city1,
    pincode: Number(req.body.pincode1),
    state: req.body.state1,
    country: req.body.country1
  };

  var user = await User.findOne({ _id: req.user._id });
  temp = [address];
  user.primary_address = temp;
  await user.save();
  res.redirect('/users/profile');
});



router.post('/update/secondaryaddress', async (req, res) => {
  var address = {
    name: req.body.nameadd2,
    address_line1: req.body.addline12,
    address_line2: req.body.addline22,
    city: req.body.city2,
    pincode: req.body.pincode2,
    state: req.body.state2,
    country: req.body.country2
  }

  var user = await User.findOne({ _id: req.user._id });
  temp = [address];
  user.secondary_address = temp;
  await user.save();
  res.redirect('/users/profile');
});


router.get('/orders', async (req, res) => {
  if (!req.user) {
    res.redirect('/users/login');
  }
  else {
    var orders = await Order.find({ userid: req.user._id });
    res.render('myorders', { title: 'My Orders', data: orders });
  }
});


router.get('/orders/:id/downloadinvoice', async (req, res) => {
  if (!req.user) {
    res.redirect('/users/login');
  }
  else {
    const order = await Order.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    var arr = [];
    var sub = 0.0;
    for (let item of order.bill) {
      var product = await Product.findOne({ _id: item.productid });
      arr.push({
        "quantity": item.count,
        "description": product.name,
        "tax": 5,
        "price": product.price
      });
      sub += product.price * item.count;
    }
    var ship = 0;
    if (sub > 2000.0 || sub == 0.0) {
      ship = 0.0;
    }
    else {
      ship = 200.0;
    }
    var xx = (1.05 * sub + ship).toFixed(2);

    arr.push({
      "quantity": "1",
      "description": "Shipping Charges",
      "tax": 0,
      "price": ship
    });
    arr.push({
      "quantity": "1",
      "description": "Promo Applied",
      "tax": 0,
      "price": (order.totalCost - xx)
    });

    var data = {
      "currency": "INR",
      "taxNotation": "gst",
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
      "logo": "https://i.ibb.co/gr9sWcY/logo.png", //or base64
      "sender": {
        "company": "EZ-Shopping",
        "address": "91-A, Ram Nagar",
        "zip": "440010",
        "city": "Nagpur",
        "country": "India"
      },
      "client": {
        "company": "Rushabh",
        "address": order.shippingAddress.address.address_line1 + "," + order.shippingAddress.address.address_line2,
        "zip": order.shippingAddress.address.pincode,
        "city": order.shippingAddress.address.city,
        "country": order.shippingAddress.address.country
      },
      "invoiceNumber": order._id.toString(),
      "invoiceDate": order.time.toString(),
      "products": arr,
      "Promo Applied": order.totalCost,
      "bottomNotice": "Kindly make the payment from 'My Orders' page, ignore if already paid.",
    };

    easyinvoice.createInvoice(data, function (result) {
      result = result.pdf;
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="filename.pdf"'
      });

      const download = Buffer.from(result, 'base64');

      res.end(download);

    });
  }
});


router.get('/getaddress/:num', async (req, res) => {
  if (req.params.num == "1") {
    var address = await User.findOne({ _id: req.user._id });
    res.status(200).send(address.primary_address[0]);
  }
  else {
    var address = await User.findOne({ _id: req.user._id });
    res.status(200).send(address.secondary_address[0]);
  }
});



router.get('/logout', async (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
