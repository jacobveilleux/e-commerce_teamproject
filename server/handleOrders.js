"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleOrders = async (req, res, next) => {
  const client = await new MongoClient(MONGO_URI, options);

  // connect
  await client.connect();

  // declare db
  const db = client.db("DREAM-TEAM");

  const newPurchase = req.body;
  console.log(newPurchase);

  let address = newPurchase.address;
  let postalCode = newPurchase.postalCode;

  if (newPurchase) {
    for (let i = 0; i < newPurchase.cart.length; i++) {
      const query = { _id: +newPurchase.cart[i]._id };
      const item = await db.collection("items").findOne(query);

      if (newPurchase.cart[i].amount > +item.numInStock) {
        res.status(400).json({ status: 400, error: "out-of-stock" });
        return;
      }
    }

    if (
      newPurchase.name === "" ||
      newPurchase.surname === "" ||
      newPurchase.city === ""
    ) {
      res.status(400).json({ status: 400, error: "missing-data" });
      return;
    }

    if (newPurchase.country.toLowerCase() !== "canada") {
      res.status(400).json({ status: 400, error: "wrong-country" });
      return;
    }

    const containsNumbers = (str) => {
      var regexp = /\d/g;
      return regexp.test(str);
    };

    if (containsNumbers(address) === false) {
      res.status(400).json({ status: 400, error: "bad-address" });
      return;
    }

    if (containsNumbers(postalCode) === false) {
      res.status(400).json({ status: 400, error: "missing-data" });
      return;
    }

    if (!newPurchase.email.includes("@")) {
      res.status(400).json({ status: 400, error: "missing-data" });
      return;
    }
  }

  client.close();
  next();
};

module.exports = { handleOrders };
