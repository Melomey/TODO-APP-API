import express from 'express';
import bodyParser from 'body-parser';
import todosRoutes from "./routes/todos.routes.js";


//Create express app
const app = express();

// create express app
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// Use routes
app.use(todosRoutes);

//Listen for incoming request
app.listen(4000, () => {
    console.log("Express app is running!")
});