const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB Connection Successful'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A  tour must have a name.'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.']
  }
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
