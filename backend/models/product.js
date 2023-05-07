const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: "String",
            max: 100
        },
        description: {
            type: "String"
        },
        original_price: {
            type: "Number"
        },
        discounted_price: {
            type: "Number"
        },
        category_id: {
            type: "String",
            max: 120
        },
        image: {
            type: "String"
        }
    }
)
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;