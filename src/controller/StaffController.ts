import { Request, Response, NextFunction } from 'express';
import Staff from './../db/models/staff.model';
import Helper from '../helper/Helper';
import PasswordHelper from '../helper/PasswordHelper';
import cookies from 'cookie-parser';
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
                roleId: 2,
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
                roleId: staff?.roleId,
            };
            const token = Helper?.GenerationToken(dataStaff);
            const refreshToken = Helper?.RefreshToken(dataStaff);
            staff.accesstoken = refreshToken;
            await staff.save();
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                // maxAge: 24 * 60 * 60 * 1000,
                path: '/',
                secure: false,
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

    RefreshToken: async (req: Request, res: Response): Promise<Response> => {
        try {
            const decodedToken = req.headers?.cookie;
            const refreshToken = decodedToken?.split('=')[1];
            if (!refreshToken) {
                return res.status(401).send(Helper.ResponseData(401, 'Unauthorized', null, null));
            }
            const decodedUser = Helper.EtractRefreshToken(refreshToken);

            if (!decodedUser) {
                return res.status(401).send(Helper.ResponseData(401, 'Unauthorized', null, null));
            }
            const token = Helper.GenerationToken(decodedUser);
            const resutlStaff = {
                id: decodedUser.id,
                userName: decodedUser?.userName,
                email: decodedUser?.email,
                role: decodedUser?.role,
                token: token,
            };
            return res.status(200).send(Helper.ResponseData(200, 'SuccessFully', null, resutlStaff));
        } catch (error) {
            return res.status(500).send(Helper.ResponseData(500, '', error, null));
        }
    },
};

export default StaffController;
