import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        minlength:[3,"Too short product name"],
        maxlength:[30,"Too long product name"]
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    priceafterdiscount: {
        type: Number
        },
    finalprice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Create the Product model
const productModule = mongoose.model("Product", productSchema);

export{productSchema,productModule}
