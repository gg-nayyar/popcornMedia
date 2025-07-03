import { Request, Response } from "express";
import Theatre from "../models/theatreSchema.model";

export const addTheatre = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, location, showtimes } = req.body;

    if (!name || !location || !showtimes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const theatre = new Theatre({
      name,
      location,
      showtimes,
    });

    await theatre.save();
    return res
      .status(201)
      .json({ message: "Theatre added successfully", theatre });
  } catch (error) {
    console.error("Error adding theatre:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getTheatresByMovie = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { movieId } = req.params;

    const theatres = await Theatre.find({
      "showtimes.movieId": movieId,
    }).populate("showtimes.movieId");

    if (theatres.length === 0) {
      return res
        .status(404)
        .json({ message: "No theatres found", theatres: [] });
    }

    return res
      .status(200)
      .json({ message: "Theatres fetched successfully", theatres });
  } catch (error) {
    console.error("Error fetching theatres:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", theatres: [] });
  }
};
export const updateTheatre = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { theatreId } = req.params;
    const { name, location, showtimes } = req.body;

    if (!name || !location || !showtimes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedTheatre = await Theatre.findByIdAndUpdate(
      theatreId,
      { name, location, showtimes },
      { new: true }
    );

    if (!updatedTheatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    return res
      .status(200)
      .json({ message: "Theatre updated successfully", theatre: updatedTheatre });
  } catch (error) {
    console.error("Error updating theatre:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTheatre = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { theatreId } = req.params;

    const deletedTheatre = await Theatre.findByIdAndDelete(theatreId);

    if (!deletedTheatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    return res
      .status(200)
      .json({ message: "Theatre deleted successfully", theatre: deletedTheatre });
  } catch (error) {
    console.error("Error deleting theatre:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getShowtimesByTheatre = async (
    req: Request,
    res: Response
    ): Promise<any> => {
    try {
        const { theatreId } = req.params;
    
        const theatre = await Theatre.findById(theatreId).populate("showtimes.movieId");

        if (!theatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }

        return res.status(200).json({ message: "Showtimes fetched successfully", showtimes: theatre.showtimes });
    } catch (error) {
        console.error("Error fetching showtimes:", error);
        return res.status(500).json({ message: "Internal server error", showtimes: [] });
    }
};
