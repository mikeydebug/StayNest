
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathutil');







const registeredHomes = [];


module.exports = class Home {
    constructor( title, description, price, location, imageUrl, rating) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.location = location;
        this.imageUrl = imageUrl;
        this.rating = rating;
    }

    save() {
        Home.fetchAll(registeredHomes => {
        registeredHomes.push(this);
        const homeDataPath = path.join(rootDir, 'data', 'homes_data.json');

        fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
            if (err) {
                console.log('Error writing file', err);
            }

        });
    });

    }

    static fetchAll(callback) {
        const homeDataPath = path.join(rootDir, 'data', 'homes_data.json');
        fs.readFile(homeDataPath, (err, data) => {
            if (!err) {
                callback(JSON.parse(data));
            }
            else {
            callback([]);
            }
        });

    }
}