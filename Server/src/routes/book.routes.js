import { Router } from 'express';
import { fetchBookDetails,addBookDetails,updateBookDetails,deleteBookDetails } from '../controllers/book.controllers.js';

const router = Router();

router.route('/fetch').get(fetchBookDetails);
router.route('/add').post(addBookDetails);
router.route('/update/:id').put(updateBookDetails);
router.route('/delete/:id').delete(deleteBookDetails);
export { router }