import { Router } from "express";
import {MongoClient} from 'mongodb';

const router = Router();

const url = 'mongodb+srv://todo-api:PLyUDUOOf5iJ9EJ5@webdev-cohort1-alpha.epoqp9f.mongodb.net/?retryWrites=true&w=majority&appName=webdev-cohort1-alpha';

const client = new MongoClient(url);


//Define routes
router.post('/todos', async (req, res) => {
    //connect mongodb client
    await client.connect();
    //get access to todo database
    const db = client.db('todo-db');
    //get access to todos collection
    const collection = db.collection('todos');
    //add todo document to todos collection
    const result = await collection.insertOne(req.body);
    //disconnect mongodb client
    await client.close();
    //return response
    res.json(result);
});

//
router.get('/todos', (req, res) => {
    res.send('Get all todos!')
});

router.delete('/todos', (req, res) => {
    res.send('delete all todos!')
});

// get todo with id
router.get('/todos/:id', (req, res) => {
    res.send(`Get todo with id: ${req.params.id}`);
});

// update todo
router.patch('/todos/:id', (req, res) => {
    res.send(`Updste todo with id: ${req.params.id}`);
});

//delete todo
router.delete('/todos/:id', (req, res) => {
    res.send(`Delete todo with id: ${rq.params.id}`);
});


//Export router
export default router;