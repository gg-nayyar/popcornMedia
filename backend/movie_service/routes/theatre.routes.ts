import { Router } from 'express';
import { isAdminMiddleware } from '../middleware/isAdmin.middleware';
import { addTheatre, getTheatresByMovie, updateTheatre, deleteTheatre, getShowtimesByTheatre } from '../controllers/theatre.controllers';

const router = Router();

router.post('/addTheatre', isAdminMiddleware, addTheatre);
router.get('/:movieId', getTheatresByMovie);
router.put('/:theatreId', isAdminMiddleware, updateTheatre);
router.delete('/:theatreId', isAdminMiddleware, deleteTheatre);
router.get('/:theatreId/showtimes', getShowtimesByTheatre);

export default router;
