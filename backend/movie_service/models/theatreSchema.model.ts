import mongoose from 'mongoose';

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  showtimes: [{
      movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Movie',
          required: true,
        },
        showtime: {
            type: String,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/,
            required: true,
        },
        audi: {
          type: String,
          required: true,
        },
    },
  ],
}, { timestamps: true });

const Theatre = mongoose.model('Theatre', theatreSchema);

export default Theatre;