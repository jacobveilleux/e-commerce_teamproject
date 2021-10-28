"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { handleOrders } = require("./handleOrders")

const {
  getItems,
  getItem,
  getItemsByCategory,
  getItemByLocation,
  purchaseItem,
  getCompanies,
  getCompany,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //ENDPOINTS

  // GET all companies
  .get("/company", getCompanies)

  // GET company by :id
  .get("/company/:_id", getCompany)

  // GET all items
  .get("/items", getItems)

  // GET one item by id
  .get("/items/:_id", getItem)

  // GET items by category
  .get("/items/category/:category", getItemsByCategory)

  // GET items by body location
  .get("/items/location/:body_location", getItemByLocation)

  // POST update item stock
  .post("/checkout", handleOrders, purchaseItem)

  
  // POST IS LIKE THIS:
  // { 
  //   "name": "Jena",
  //   "surname" : "Mass",
  //   "item" : "6543",
  //   "amount" : "2",
  //   "email": "j@j.com",
  //   "address": "32 Blah",
  //   "postalCode": "A2DF",
  //   "city": "Montreal",
  //   "country": "Canada"
  // }

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
