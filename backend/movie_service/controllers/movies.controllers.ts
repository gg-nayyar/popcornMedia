import { Request, Response } from "express";
import Movie from "../models/movieSchema.model";

// interface AddMovieResponse {
//     message: string;
//     movie?: {
//         movieId: string;
//         title: string;
//         director: string;
//         releaseDate: Date;
//         locations: { city: string; state: string }[];
//         genre: string[];
//         rating?: number;
//     }[];
// }

// interface AvailableMoviesQuery {
//   city?: string;
//   state?: string;
// }

// interface AvailableMoviesResponse {
//   message: string;
//   movies: {
//     movieId: string;
//     title: string;
//     director: string;
//     releaseDate: Date;
//     locations: { city: string; state: string }[];
//     genre: string[];
//     rating?: number;
//   }[];
// }

export const availableMovies = async (req: Request, res: Response): Promise<any> => {
  try {
    const { city, state } = req.query;

    if (!city || !state) {
      return res
        .status(400)
        .json({ message: "City and state are required", movies: [] });
    }

    const movies = await Movie.find({
      "locations.city": city,
      "locations.state": state,
    });

    if (movies.length === 0) {
      return res
        .status(404)
        .json({
          message: "No movies found for the specified location",
          movies: [],
        });
    }

    return res
      .status(200)
      .json({ message: "Movies fetched successfully", movies });
  } catch (error) {
    console.error("Error fetching available movies:", error);
     return res.status(500).json({ message: "Internal server error", movies: [] });
  }
};

export const addMovie = async (req: Request, res: Response): Promise<any> => {
  try {
    const { movieId, title, director, releaseDate, locations, genre, rating } =
      req.body;

    if (
      !movieId ||
      !title ||
      !director ||
      !releaseDate ||
      !locations ||
      !genre
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMovie = new Movie({
      movieId,
      title,
      director,
      releaseDate,
      locations,
      genre,
      rating,
    });

    await newMovie.save();
    return res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    console.error("Error adding movie:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMovie = async (req: Request, res: Response): Promise<any> => {
  try {
    const { movieId } = req.params;
    const updateData = req.body;

    if (!movieId) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const updatedMovie = await Movie.findOneAndUpdate({ movieId }, updateData, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    console.log("Update movie operation completed");
  }
};

export const deleteMovie = async (req: Request, res: Response): Promise<any> => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const deletedMovie = await Movie.findOneAndDelete({ movieId });

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovie,
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const movie = await Movie.findOne({ movieId });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getMoviesByTitle = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title } = req.query as { title?: string };

    console.log("Title received: ", title);

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const movies = await Movie.find({
      title: { $regex: new RegExp(title, "i") },
    });

    if (movies.length === 0) {
      console.log("ULALALALALELO: ", movies)
      return res
        .status(404)
        .json({ message: "No movies found with the specified title" });
    }
      console.log("HELLOOOO: ", movies);

    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies by title:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
