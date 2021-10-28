const fs = require("file-system");
const assert = require("assert");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const companies = JSON.parse(fs.readFileSync("data/companies.json"));
const items = JSON.parse(fs.readFileSync("data/items.json"));

const updatedArr = [];

companies.forEach((item) => {
  updatedArr.push({
    name: item.name,
    url: item.url,
    country: item.country,
    _id: item.id,
  });
});

const updatedItemArr = [];

items.forEach((item) => {
  updatedItemArr.push({
    name: item.name,
    price: item.price,
    bodyLocation: item.body_location,
    id: item._id,
    image: item.imageScr,
  });
});

fs.writeFileSync("data/fixedCompanies.json", JSON.stringify(updatedArr));
fs.writeFileSync("data/fixedItems.json", JSON.stringify(updatedItemArr));

const dbName = "DREAM-TEAM";

const batchImport = async () => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db(dbName);

    // creating a new collection "companies"
    const resultC = await db.collection("companies").insertMany(companies);
    assert.equal(companies.length, resultC.insertedCount);

    // creating a new collection "items"
    const resultI = await db.collection("items").insertMany(items);
    assert.equal(items.length, resultI.insertedCount);

    // On success, send
    console.log({ status: 201, data: resultC });
    console.log({ status: 201, data: resultI });
  } catch (err) {
    console.log(err.stack);
  }
  // close
  client.close();
};

batchImport();
