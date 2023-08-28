import {NextFunction, Request, Response, Router} from 'express';
import {CardController} from "../controller/cardController";
const { validate } = require('../validator/cardValidator');
const { authenticateToken } = require('../middleware/authMiddleware');
const { deleteLogger, updateLogger } = require('../middleware/loggerMiddleware');

const router = Router();
const cardController = new CardController();

router.post('/', [authenticateToken,validate('createCard')], (req: Request, res: Response, next: NextFunction) => cardController.createCard(req, res, next));
router.get('/', authenticateToken, (req: Request, res: Response, next: NextFunction) => cardController.listCards(req, res, next));
router.get('/:id', [authenticateToken, validate('getCard')], (req: Request, res: Response, next: NextFunction) => cardController.getCard(req, res, next));
router.put('/:id', [authenticateToken, validate('updateCard'), updateLogger], (req: Request, res: Response, next: NextFunction) => cardController.updateCard(req, res, next));
router.delete('/:id', [authenticateToken, validate('deleteCard'), deleteLogger], (req: Request, res: Response, next: NextFunction) => cardController.deleteCard(req, res, next));
export default router;
