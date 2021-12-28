var express = require('express');
var router = express.Router();
var passport = require('passport');
const Formidable = require('formidable');
const cloudinary = require("cloudinary");
require('dotenv').config("../.env");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


router.route('/login')
  .get(async (req, res) => {
    res.render('login', { title: 'Login' });
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/users/login'
  }), async (req, res) => {
    res.redirect('/');
  });

router.route('/register')
  .get(async (req, res) => {
    res.render('register', { title: 'Register' });
  })
  .post(async (req, res) => {
    const form = Formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      cloudinary.uploader.upload(files.idapp.filepath, async (result) => {

        var newVendor = new Vendor({
          name: fields.name,
          address: {
            address_line1: fields.address_line1,
            address_line2: fields.address_line2,
            city: fields.city,
            pincode: fields.pincode,
            state: fields.state,
            country: fields.country
          },
          email: fields.email,
          contact: fields.contact,
          identity_document: result.secure_url
        });

        await newVendor.save();
        newVendor.setPassword(fields.pwd);
        await newVendor.save();
        res.redirect('/users/login');
      });
    });
  });

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
