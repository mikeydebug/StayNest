

// const { getDb } = require('../utils/database');

// module.exports = class Home {
//     constructor( title, description, price, location, imageUrl, rating,id) {
//         this.title = title;
//         this.description = description;
//         this.price = price;
//         this.location = location;
//         this.imageUrl = imageUrl;
//         this.rating = rating;
//         this.id = id;
//     }

//     save() {
//         const db = getDb();

//         if (this.id){ // existing home
//         //return a promise
//         return db.collection('homes').updateOne({ id: this.id }, { $set: this });
//         }
//         else {// new home
//         //return a promise
//         return db.collection('homes').insertOne(this);
//         }
//     }
//     static fetchAll(callback) {
//         const db = getDb();
//         return db.collection('homes').find().toArray();

//     }

//     static findById(id, callback) {
//         const db = getDb();
//         return db.collection('homes').findOne({ id: id });

//     }

//     static deleteById(id) {
//         const db = getDb();
//         return db.collection('homes').deleteOne({ id: id });
//     }
// }


const mongoose = require('mongoose');  


const homeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Home', homeSchema);
