import { Response, Request, NextFunction } from 'express';
import Helper from '../helper/Helper';

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization;
        const token = authToken?.split(' ')[1];
        if (!token) {
            return res.status(401).send(Helper.ResponseData(401, 'Unauthorized', null, null));
        }

        const result = Helper.EtractToken(token!);
        if (!result) {
            return res.status(403).json({ message: 'Token is invalid' });
        }

        console.log('result', result);
        /* initial value req data */
        res.locals.roleId = result?.roleId;
        res.locals.email = result?.email;

        next();
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, '', error, null));
    }
};

const SuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = res.locals.roleId;

        console.log('Role: ', role);

        if (role !== 1) {
            return res.status(403).send(Helper.ResponseData(403, 'Forbidden', '', null));
        }
        next();
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, '', error, null));
    }
};

const BasicAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {}
};

const RoleUser = (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {}
};

export default { Authenticated, SuperAdmin };
