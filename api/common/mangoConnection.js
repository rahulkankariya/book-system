const mongoose = require('mongoose');
const config  =require('./config')

const Url = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_NAME}.k8lxwpj.mongodb.net/`

mongoose.connect(Url, {
})
.then(() => {
  console.log('MongoDB connected successfully!');
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
});
