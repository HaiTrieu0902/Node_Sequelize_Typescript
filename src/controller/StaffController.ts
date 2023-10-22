import { Request, Response, NextFunction } from 'express';
import Staff from './../db/models/staff.model';
import Helper from '../helper/Helper';
import PasswordHelper from '../helper/PasswordHelper';

const StaffController = {
    Register: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { userName, email, password, role } = req.body;
            const hashed = await PasswordHelper?.PasswordHasing(password);
            const staff = await Staff.create({
                userName,
                email,
                password: hashed,
                role,
                roleId: 1,
                accesstoken: '11',
            });

            return res.status(201).send(Helper.ResponseData(201, 'created successfully', null, staff));
        } catch (error) {
            return res.status(500).send(Helper.ResponseData(500, '', error, null));
        }
    },
};

export default StaffController;
