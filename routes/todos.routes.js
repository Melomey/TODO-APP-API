import { Router } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: [".env.local"] });

const router = Router();

const url = process.env.MONGO_URI;

const client = new MongoClient(url);
const todoDb = "todo-db";
const todoCollection = "todos";

//Define routes
router.post("/todos", async (req, res) => {
  //connect mongodb client
  await client.connect();

  //get access to todo database
  const db = client.db(todoDb);

  //get access to todos collection
  const collection = db.collection(todoCollection);

  //add todo document to todos collection
  const result = await collection.insertOne({
    ...req.body,
    isCompleted: false,
    createdAt: new Date(),
  });

  //disconnect mongodb client
  await client.close();

  //return response
  res.json(result);
});

router.get("/todos", async (req, res) => {
  //connect mongodb client
  await client.connect();

  //get access to todo database
  const db = client.db(todoDb);

  //get access to todos collection
  const collection = db.collection(todoCollection);

  //find all todos from todos collection
  const limit = parseInt(req.query.limit) || 10;
  const findResult = await collection.find({}).limit(limit).toArray();

  //disconnect mongodb client
  await client.close();

  //return response
  res.json(findResult);
});

router.delete("/todos", async (req, res) => {
  //connect mongodb client
  await client.connect();

  //get access to todo database
  const db = client.db(todoDb);

  //get access to todos collection
  const collection = db.collection(todoCollection);

  //add todo document to todos collection
  const deleteResult = await collection.deleteMany({});

  //disconnect mongodb client
  await client.close();

  //return response
  res.json(deleteResult);
});

//
router.get("/todos", (req, res) => {
  res.send("Get all todos!");
});

router.delete("/todos", (req, res) => {
  res.send("delete all todos!");
});

// get todo with id
router.get("/todos/:id", (req, res) => {
  res.send(`Get todo with id: ${req.params.id}`);
});

// update todo
router.patch("/todos/:id", (req, res) => {
  res.send(`Updste todo with id: ${req.params.id}`);
});

//delete todo
router.delete("/todos/:id", (req, res) => {
  res.send(`Delete todo with id: ${rq.params.id}`);
});

//Export router
export default router;
