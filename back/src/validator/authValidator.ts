import {body} from 'express-validator';

exports.validate = (method: string) => {
    switch (method) {
        case 'login': {
            return [
                body('login', 'login does not exists').exists().isString().trim(),
                body('password', 'password does not exists').exists().isString().trim(),
            ];
        }
    }
}
