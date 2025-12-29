
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathutil');
const favoriteDataPath = path.join(rootDir, 'data', 'favorites_data.json');










module.exports = class Favorite {

    


    static addtoFavorite(home) {
        this.getFavorites((favorites) => {
            if (!favorites.find(fav => fav.id === home.id)) {
                favorites.push(home);
                fs.writeFile(favoriteDataPath, JSON.stringify(favorites), (err) => {
                    if (err) {
                        console.log('Error writing file', err);
                    }
                });
            }
            
        });

    }



    static getFavorites(callback) {

        fs.readFile(favoriteDataPath, (err, data) => {
                    if (!err) {
                        callback(JSON.parse(data));
                    }
                    else {
                    callback([]);
                    }
                });
    }

    static deleteFromFavorites(homeId) {
        this.getFavorites((favorites) => {
            const updatedFavorites = favorites.filter(fav => fav.id !== homeId);
            fs.writeFile(favoriteDataPath, JSON.stringify(updatedFavorites), (err) => {
                if (err) {
                    console.log('Error writing file', err);
                }
            });
        });
    }
}