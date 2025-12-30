const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    homeId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Favorite', favoriteSchema);







// const { getDb } = require("../utils/database");
// module.exports = class Favorite {

    


//     static addtoFavorite(homeid) {
//         const db = getDb();
//         return db.collection('favorites').insertOne(homeid);

//     }



//     static getFavorites(callback) {

//         const db = getDb();
//         return db.collection('favorites').find().toArray();
//     }



//     static deleteFromFavorites(homeId) {
//         const db = getDb();
//         return db.collection('favorites').deleteOne({ id: homeId });
//     }
// }