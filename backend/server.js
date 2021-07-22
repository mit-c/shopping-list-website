const express = require("express")
var app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const Item = require("./shopping-list.model")
var bodyParser = require("body-parser")
var PORT = 4000
app.use(cors())
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser)
app.use(urlencodedParser)

/**
 * Routes (TODO: refactor)
 */
const shoppingListRoutes = express.Router()
app.use("/shopping-list", shoppingListRoutes)
shoppingListRoutes.route("/").get((req, res) => {
    Item.find((err, shoppingItems) => {
        if (err) {
            console.log(err)
        } else {
            res.json(shoppingItems);
        }
    })
})




shoppingListRoutes.route("/add").post((req, res) => {
    console.log(req.body)
    var shoppingItem = new Item(req.body)
    shoppingItem.save()
        .then(item => {
            res.status(200).json({
                "shoppingItem": item
            })
        })
        .catch(err => {
            res.status(400).send("adding new item failed");
            console.log(err)
        })
})

shoppingListRoutes.route("/:id").get((req, res) => {
    var id = req.params.id
    Item.findById(id, (err, shoppingItem) => {
        if (err) {
            console.log(err)
        } else {
            res.json(shoppingItem)
        }
    })
})

shoppingListRoutes.route("/update/:id").post((req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if (!item) {
            res.status(404).send("data os mpt found")
        } else {
            item.name = req.body.name
            item.quantity = req.body.quantity
            item.priority = req.body.priority
            item.completed = req.body.completed

            item.save().then(item => {
                res.json("Item with id " + req.params.id + " has been updated")
            })
                .catch(err => {
                    res.status(400).send("Update not possible")
                    console.log(err)
                })
        }
    })
})

shoppingListRoutes.route("/delete/all").post((req, res) => {
    Item.deleteMany({})
        .then(numDeletions => {
            console.log(numDeletions)
            res.status(200).send("Successfully deleted all documents")
        }).catch(err => {
            console.error(err)
            res.status(400).send("Deletion of all documents not possible")
        })
})

shoppingListRoutes.route("/delete/:id").post((req, res) => {

    Item.deleteOne({
        "_id": req.params.id
    })
        .then(numDeletions => {
            console.log(numDeletions)
            res.status(200).send("Document successfully deleted")
        })
        .catch(err => {
            console.error(err);
            res.status(400).send("Document did not delete")
        }
        )











})
/**
 * MongoDB 
 */

const connectionString = 'mongodb://127.0.0.1:27017/shopping-list'
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

/**
 * Listening
 */

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT)
});