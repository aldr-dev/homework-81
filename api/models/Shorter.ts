import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShorterSchema = new Schema({
  shortUrl: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true
  }
});

const Shorter = mongoose.model('Shorter', ShorterSchema);

export default Shorter;