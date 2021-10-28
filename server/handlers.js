"use strict";

// mongodb stuff
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// GET all compagnies
const getCompanies = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db("DREAM-TEAM");

    // look inside collection "companies"
    const companies = await db.collection("companies").find().toArray();

    companies
      ? res.status(200).json({ status: 200, data: companies })
      : res.status(404).json({ status: 404, data: "companies not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: "something smell funny here" });
  }
  // close
  client.close();
};

// GET companies by ID
const getCompany = async (req, res) => {
  const { _id } = req.params;
  const client = await new MongoClient(MONGO_URI, options);

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db("DREAM-TEAM");

    // look inside collection "companies"
    const companies = await db.collection("companies").find().toArray();

    const filterCompaniesById = companies.filter((company) => {
      return company._id == _id;
    });

    if (filterCompaniesById.length) {
      res.status(200).json({ status: 200, data: filterCompaniesById[0] });
    } else {
      res.status(404).json({ status: 404, message: "company not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "something smell funny with companies id",
    });
  }

  // close
  client.close();
};

//GET all items

const getItems = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    // connect
    await client.connect();
    // declare db
    const db = client.db("DREAM-TEAM");

    // look inside collection "items"
    const items = await db.collection("items").find().toArray();

    if (items.length > 0) {
      res.status(200).json({ status: 200, data: items });
    } else {
      res.status(400).json({ status: 400, message: "No items" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: 500, message: "get all items doesn't work" });
  }
  // close
  client.close();
};

//GET an item by id

const getItem = async (req, res) => {
  const { _id } = req.params;
  const client = await new MongoClient(MONGO_URI, options);

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db("DREAM-TEAM");

    // look inside collection "items"
    const items = await db.collection("items").find().toArray();

    const filterItems = items.filter((item) => {
      return item._id == _id;
    });

    if (filterItems.length) {
      res.status(200).json({ status: 200, data: filterItems[0] });
    } else {
      res.status(400).json({ status: 400, message: "no items here" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: 500, message: "get item by id doesn't work" });
  }
  // close
  client.close();
};

//GET all items by category

const getItemsByCategory = async (req, res) => {
  const { category } = req.params;
  const client = await new MongoClient(MONGO_URI, options);

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db("DREAM-TEAM");

    // look inside collection "items"
    const items = await db.collection("items").find({ category }).toArray();

    if (items.length) {
      res.status(200).json({ status: 200, data: items });
    } else {
      res.status(400).json({ status: 400, data: "no such category exists" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: 500, data: "get item by category doesn't work" });
  }
  //close
  client.close();
};

// GET items by body location

const getItemByLocation = async (req, res) => {
  const { body_location } = req.params;
  const client = await new MongoClient(MONGO_URI, options);

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db("DREAM-TEAM");

    // look inside collection "items" to find body location
    const items = await db
      .collection("items")
      .find({ body_location })
      .toArray();

    if (items.length) {
      res.status(200).json({ status: 200, data: items });
    } else {
      res
        .status(400)
        .json({ status: 400, data: "no such body location exists" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: 500, data: "get item by body location doesn't work" });
  }
  //close
  client.close();
};

//POST update item stock

const purchaseItem = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db("DREAM-TEAM");

    // insert new purchase inside purchases
    const newPurchase = await db.collection("purchases").insertOne(req.body);

    if (newPurchase) {
      for (let i = 0; i < req.body.cart.length; i++) {
        const query = { _id: +req.body.cart[i]._id };
        const item = await db.collection("items").findOne(query);

        const newValues = {
          $set: { numInStock: item.numInStock - req.body.cart[i].amount },
        };
        await db.collection("items").updateOne(query, newValues);
      }
    }
    res.status(200).json({ status: 200, data: req.body, message: "success" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: 500, message: "you can't purchase any items bish" });
  }
  // close
  client.close();
};

module.exports = {
  getCompanies,
  getCompany,
  getItems,
  getItem,
  getItemsByCategory,
  getItemByLocation,
  purchaseItem,
};
