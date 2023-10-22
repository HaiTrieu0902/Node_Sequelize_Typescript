import Validator from 'validatorjs';
import { Request, Response, NextFunction } from 'express';
import Helper from '../../helper/Helper';
import Staff from '../../db/models/staff.model';

const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, email, password, role } = req.body;
        const data = {
            userName,
            email,
            password,
            role,
        };
        const rules: Validator.Rules = {
            userName: 'required|string|max:50',
            email: 'required|email',
            password: 'required|min:8',
            role: 'required',
            // role: 'required|same:password',
        };
        const validate = new Validator(data, rules);
        if (validate.fails()) {
            return res.status(400).send(Helper.ResponseData(400, 'Bad Request', validate.errors, null));
        }

        /* check exist email */
        const user = await Staff.findOne({
            where: {
                email: data.email,
            },
        });

        if (user) {
            return res.status(400).send(Helper.ResponseData(400, 'Bad Request', 'Email user has exist', null));
        }

        next();
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, '', error, null));
    }
};

export default { RegisterValidation };
