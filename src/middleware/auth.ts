import { Response, Request, NextFunction } from 'express';
import Helper from '../helper/Helper';

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization;
        const token = authToken?.split(' ')[1];

        console.log('token: ', token);
        if (!token) {
            return res.status(401).send(Helper.ResponseData(401, 'Unauthorized', null, null));
        }

        const result = Helper.EtractToken(token!);
        if (!result) {
            return res.status(403).json({ message: 'Token is invalid' });
        }
        next();
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, '', error, null));
    }
};

export default { Authenticated };
