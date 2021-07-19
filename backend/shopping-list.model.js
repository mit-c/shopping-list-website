const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

var shoppingList = new Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    priority: {
        type: String
    },
    completed: {
        type: Boolean
    }
});


module.exports = mongoose.model('shopping-list', shoppingList);