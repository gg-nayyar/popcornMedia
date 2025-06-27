import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  locations: [{ city: { type: String, required: true }, state: { type: String, required: true } }],
  genre: [{ type: String, required: true }],
  rating: { type: Number, min: 0, max: 10 },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
