import { Router } from 'express';
import {CardController} from "../controller/cardController";
const { validate } = require('../validator/cardValidator');

const router = Router();
const cardController = new CardController();

router.post('/', validate('createCard'), (req, res, next) => cardController.createCard(req, res, next));
router.get('/', (req, res, next) => cardController.listCards(req, res, next));
router.get('/:id', validate('getCard'), (req, res, next) => cardController.getCard(req, res, next));
router.put('/:id', validate('updateCard'), (req, res, next) => cardController.updateCard(req, res, next));
router.delete('/:id', validate('deleteCard'), (req, res, next) => cardController.deleteCard(req, res, next));
export default router;
