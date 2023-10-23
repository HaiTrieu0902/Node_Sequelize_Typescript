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
    Login: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const staff = await Staff.findOne({
                where: {
                    email: email,
                },
            });
            if (!staff) {
                return res.status(401).send(Helper.ResponseData(401, 'Unauthorized', null, null));
            }
            const matched = await PasswordHelper.PasswordCompare(password, staff.password);
            if (!matched) {
                return res.status(401).send(Helper.ResponseData(401, 'Password is wrong', null, null));
            }
            const dataStaff = {
                id: staff?.id,
                userName: staff?.userName,
                email: staff?.email,
                role: staff?.role,
            };
            const token = Helper?.GenerationToken(dataStaff);
            const refreshToken = Helper?.RefreshToken(dataStaff);
            staff.accesstoken = refreshToken;
            await staff.save();
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            const dataRes = {
                id: staff?.id,
                userName: staff?.userName,
                email: staff?.email,
                role: staff?.role,
                token: token,
            };

            return res.status(200).send(Helper.ResponseData(200, 'Login successfully', null, dataRes));
        } catch (error) {
            return res.status(500).send(Helper.ResponseData(500, '', error, null));
        }
    },
};

export default StaffController;
