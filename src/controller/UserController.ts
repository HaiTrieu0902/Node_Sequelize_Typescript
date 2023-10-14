import { Request, Response, NextFunction } from 'express';
import User from '../db/models/user.model';

// const GetAllUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await User.findAll();

//         return res.status(200).send({
//             status: 200,
//             message: 'Success',
//             data: users,
//         });
//     } catch (error) {
//         return res.status(500).send(error);
//     }
// };

const UserController = {
    GetAllUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.findAll();

            return res.status(200).send({
                status: 200,
                message: 'Success',
                data: users,
            });
        } catch (error: any) {
            // return res.status(500).send(error);
            if (error !== null && error instanceof Error) {
                return res.status(500).send({
                    status: 500,
                    message: error.message,
                    error: error,
                });
            }
            return res.status(500).send({
                status: 500,
                message: 'Internal Server Error',
                error: error,
            });
        }
    },
};

export default UserController;
