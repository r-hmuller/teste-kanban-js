import { Router } from 'express';
import {createCard, deleteCard, getCard, listCards, updateCard} from "../controller/cardController";

const router = Router();
router.post('/', createCard);
router.get('/', listCards);
router.get('/:id', getCard);
router.patch('/:id', updateCard);
router.delete('/:id', deleteCard);
export default router;
