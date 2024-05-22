const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const authRoutes = require('./routes/authRoutes.js');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

const MongoStore = connectMongo(session); // Instantiate connect-mongo
const store = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions' // Specify the collection name if needed
});

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { secure: false }
}));

app.get('/api/ping', (req, res) => {
    console.log('Received request for /api/ping');
    res.json({ success: true, message: 'Pong' });
  });  

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(`An error occurred: ${err.message}\n${err.stack}`);
  res.status(500).send('Something broke!');
});
