// mongodb+srv://poojapal88286:4iXsg6c2TEdxRsEA@cluster0.wrdxjxa.mongodb.net/
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://poojapal88286:4iXsg6c2TEdxRsEA@cluster0.wrdxjxa.mongodb.net/').then(() => {
    console.log("database connected");
}).catch(() => {
    console.log("Database Error");
})