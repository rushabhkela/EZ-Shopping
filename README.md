<div id="top"></div>

<br />
<div align="center">
  <a href="https://github.com/rushabhkela/EZ-Shopping">
    <img src="https://icons-for-free.com/iconfiles/png/512/cart+checked+ecommerce+online+shopping+shopping+cart+icon-1320165952137863404.png" alt="Logo" width="100">
  </a>

  <h3 align="center">EZ - Shopping</h3>

  <p align="center">
    A fully featured multi - vendor <b>E - commerce</b> website.
    <br />
    <a href="https://github.com/rushabhkela/EZ-Shopping"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ezshopping-rushabh.herokuapp.com">View Demo</a>
    ·
    <a href="https://github.com/rushabhkela/EZ-Shopping/issues">Report Bug</a>
    ·
    <a href="https://github.com/rushabhkela/EZ-Shopping/pulls">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#workflow">Workflow</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img width="1440" src="https://user-images.githubusercontent.com/60788199/147580438-7ca939b4-a8fa-445f-b376-19752e70afbc.png">
<img width="1440" src="https://user-images.githubusercontent.com/60788199/147580517-73411012-0f5f-4d5c-8f59-375c68510893.png">
<img width="1440" src="https://user-images.githubusercontent.com/60788199/147580529-7ba7a2e1-a098-4052-9dc8-151a1bc17e9a.png">
<img width="1440" src="https://user-images.githubusercontent.com/60788199/147580549-b21edc18-6b3c-400f-a835-372f2eeedf0c.png">
<img width="1440" src="https://user-images.githubusercontent.com/60788199/147580567-2c883dc5-f1e3-430f-8d03-e9bec432e7b6.png">

**Shopping Experience Redefined**
<br>

The Online Shopping System – EZ-Shopping is a web-based application. The purpose of the application is to automate and facilitate the whole process of shopping. The objective of this project is to develop a general – purpose online shopping store through which customers can buy products from the comfort of home through the Internet. As the world responds to the coronavirus (COVID-19) pandemic, we’re seeing a dramatic shift from in-person to online shopping. Consumers are relying on the digital world more than ever and businesses are forced to adapt their strategies and shift toward digital transformation with much more urgency than before. EZ-Shopping has all the facilities a user might need during online shopping. It has a variety of categories to choose from, wide ranges of products, flexible shopping cart and checkout methods. It is a multi-vendor application with separate vendor and admin portals.

A whole new shopping experience.

* Register/Login with ease
* Update your user profile and check the latest status of your orders
* Download invoices for past orders
* Get graphical view of your orders
* Choose from a wide range of products
    - Men's Wear
    - Women's Wear
    - Kids' Wear
    - Electronics
    - Home Appliances
    - Lifestyle Products and much more...
* A Shopping Cart with various functionalities
* Flexible Checkout and Payment options
    - Cash-On-Delivery
    - RazorPay Online Payment Gateway
  
* Order placed ? Sit back and relax. Keep checking the "My orders" page for delivery updates. The product will be delivered to your doorstep.

* Vendor Portal
    - Register for a new vendor account
    - Fill in required details and upload the necessary documents
    - Once verified from the admin portal, vendor will have access to the vendor portal
    - Add / Update / Delete Products
    - Dispatch products in orders placed by users
    
* Admin Portal
    - Secure, only one admin account provision
    - Download new vendor applications and verify them
    - Remove / Deny access to vendors
    - Once all the products of a particular order have been dispatched from its respective vendors, admin can put the order out for delivery. Order status can be updated to "Delivered", "Cancelled" etc.

* Responsive Design
* Extensive Bootstrap - Top Class UI interfaces


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This project was built with the following frameworks and technologies:

* [Node.js](https://nodejs.org/en/)
* [Express Framework](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Bootstrap](https://getbootstrap.com)
* [Javascript](https://www.w3schools.com/js/)
* [Cloudinary Storage (for vendor applications and product images)](https://cloudinary.com/)
* [RazorPay Payment Gateway](https://razorpay.com/docs/payment-gateway/web-integration/standard/)



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow the steps given below to run the project locally on your system.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  npm install nodemon@latest -g
  ```

### Installation

_Once all the prerequisites are met, the required API Keys must be generated and dependencies must be installed._

1. Create a [RazorPay Developer Account](https://dashboard.razorpay.com/signin?screen=sign_in) and get the `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` credentials.
2. Create a [Cloudinary Account](https://cloudinary.com/) and obtain the `API_KEY`, `API_SECRET` and `CLOUD` from your dashboard.
3. Create a free MongoDB Atlas cluster at [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)

4. Clone the repo
   ```sh
   git clone https://github.com/rushabhkela/EZ-Shopping.git
   ```
3. In each of the `Admin`, `Vendor` and `Client` directories, perform steps 4-6.
4. Install NPM packages
   ```sh
   npm install
   ```
5. Create the .env file
   ```sh
   cp .env.example .env
   ```
6. In the .env file, enter your credentials generated in the above steps and add a suitable session-key.
7. Good to go! Start the project locally using the following command in any of the `Admin`, `Vendor` and `Client` directories.
   ```sh
   npm start
   ```
8. ```sh
    Admin Portal : http://localhost:3002
    Vendor Portal : http://localhost:3001
    Client Portal : http://localhost:3000
   ```
9. Alternatively, you can visit the website at [EZ-Shopping](https://ezshopping-rushabh.herokuapp.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Workflow
### The below flowchart depicts the features and its connected flow in the website.
The flowchart can also be accessed at this [link](https://whimsical.com/ez-shopping-flowchart-9kc9bRe9VuCrwgz2hwn69d)

<img width="100%" src="https://user-images.githubusercontent.com/60788199/147579506-44cc5cf3-7f6f-497f-822a-a7e1d49f4f06.png" alt="flowchart">


<!-- ROADMAP -->
## Roadmap

- [x] Implement Client Side Website
- [x] Add Multi - Vendor Functionality
- [x] Create Admin Portal
- [ ] Create a graphical view dashboard for both vendor and admin
- [ ] Add a recommenndation system

See the [open issues](https://github.com/rushabhkela/VITdost/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

This project is licensed under the Apache 2.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Rushabh Kela - +91 9834473257 - kelarushabh@gmail.com

Project Link: [https://github.com/rushabhkela/EZ-Shopping](https://github.com/rushabhkela/EZ-Shopping)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Choose an Open Source License](https://choosealicense.com)
* [Font Awesome](https://fontawesome.com)
* [NPM Package - easyinvoice](https://www.npmjs.com/package/easyinvoice)
* [RazorPay Documentation](https://razorpay.com/docs/payment-gateway/web-integration/standard/)
* [Cloudinary Storage and PDF access](https://cloudinary.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

