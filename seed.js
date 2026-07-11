const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user_auth');
const Home = require('./models/home_model');
const Booking = require('./models/booking_model');

const dbUrl = process.env.MONGODB_URI || 'mongodb+srv://MayankSoni:mayankpass@staynest.8fo9pex.mongodb.net/StayNest?appName=StayNest';

const seedDatabase = async () => {
    try {
        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Connected to MongoDB for seeding');

        // Clear existing data
        await User.deleteMany({});
        await Home.deleteMany({});
        await Booking.deleteMany({});
        console.log('Cleared existing data');

        // Create Demo Users
        const hashedPassword = await bcrypt.hash('password123', 12);
        
        const hostUser = new User({
            fullName: 'Demo Host',
            email: 'host@staynest.com',
            password: hashedPassword,
            accountType: 'host'
        });
        
        const guestUser = new User({
            fullName: 'Demo Guest',
            email: 'guest@staynest.com',
            password: hashedPassword,
            accountType: 'guest'
        });

        await hostUser.save();
        await guestUser.save();
        console.log('Created Demo Users');

        // Create Demo Homes
        const homes = [
            {
                title: 'Luxury Villa in Bali',
                description: 'A beautiful luxury villa with a private pool, overlooking the rice terraces. Perfect for a relaxing getaway.',
                price: 250,
                location: 'Ubud, Bali',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                rating: 4.9,
                id: Math.random().toString(36).substr(2, 9)
            },
            {
                title: 'Modern Loft in NYC',
                description: 'Spacious and modern loft right in the heart of Manhattan. Walking distance to Central Park and Times Square.',
                price: 350,
                location: 'New York, USA',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                rating: 4.8,
                id: Math.random().toString(36).substr(2, 9)
            },
            {
                title: 'Cozy Cabin in the Swiss Alps',
                description: 'Experience the magic of the Swiss Alps in this cozy wooden cabin. Ski-in, ski-out access and a warm fireplace.',
                price: 180,
                location: 'Zermatt, Switzerland',
                image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                rating: 4.7,
                id: Math.random().toString(36).substr(2, 9)
            },
            {
                title: 'Beachfront Condo in Maui',
                description: 'Wake up to the sound of waves in this beautiful beachfront condo. Includes access to resort amenities.',
                price: 420,
                location: 'Maui, Hawaii',
                image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                rating: 4.9,
                id: Math.random().toString(36).substr(2, 9)
            },
            {
                title: 'Historic Apartment in Paris',
                description: 'Elegant apartment with a balcony overlooking the Eiffel Tower. Experience the true Parisian lifestyle.',
                price: 290,
                location: 'Paris, France',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                rating: 4.6,
                id: Math.random().toString(36).substr(2, 9)
            }
        ];

        await Home.insertMany(homes);
        console.log('Created Demo Homes');

        console.log('Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
