import { Router } from 'express';
import { availableMovies, addMovie, updateMovie, deleteMovie, getMovieById, getMoviesByTitle } from '../controllers/movies.controllers';
import { isAdminMiddleware } from '../middleware/isAdmin.middleware';

const router = Router();

router.get('/available', availableMovies);
router.post('/add', isAdminMiddleware, addMovie);
router.put('/update/:movieId', isAdminMiddleware, updateMovie);
router.delete('/delete/:movieId', isAdminMiddleware, deleteMovie);
router.get('/search', getMoviesByTitle);
router.get('/:movieId', getMovieById);


export default router;