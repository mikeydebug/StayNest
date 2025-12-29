
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathutil');
 const homeDataPath = path.join(rootDir, 'data', 'homes_data.json');






const registeredHomes = [];


module.exports = class Home {
    constructor( title, description, price, location, imageUrl, rating,id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.location = location;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.id = id;
    }

    save() {
        Home.fetchAll(registeredHomes => {
        registeredHomes.push(this);
    

        fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
            if (err) {
                console.log('Error writing file', err);
            }

        });
    });

    }

    static fetchAll(callback) {

        fs.readFile(homeDataPath, (err, data) => {
            if (!err) {
                callback(JSON.parse(data));
            }
            else {
            callback([]);
            }
        });

    }
    static findById(id, callback) {
        Home.fetchAll(registeredHomes => {
            const home = registeredHomes.find(hm => hm.id === id);
            callback(home);
        });
    }
}