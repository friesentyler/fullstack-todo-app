const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// specify middleware
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://kf7fy92:YZQVXijQGssIVnTy@test-mern.ksudm1w.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}) .then(() => console.log("Connected to Mongo"))
   .catch(console.error);

const Todo = require("./models/Todo");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// Configuring body parser middleware
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});

app.delete('/todo/remove/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
});

app.listen(3001, () => console.log("Server listening on port 3001"));