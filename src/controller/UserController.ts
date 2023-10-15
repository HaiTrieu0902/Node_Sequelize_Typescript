import { Request, Response, NextFunction } from 'express';
import User from '../db/models/user.model';

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

    GetDetailUser: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).send({
                    status: 404,
                    message: 'Not found user',
                });
            }
            return res.status(200).send({
                status: 200,
                message: 'get detail successful',
                data: user,
            });
        } catch (error) {
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

    CreateUser: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { firstName, lastName, email } = req.body;
            const user = await User.create(
                {
                    firstName,
                    lastName,
                    email,
                },
                { raw: true },
            );
            return res.status(201).send({
                status: 201,
                message: 'Create successfully',
                data: user,
            });
        } catch (error) {
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

    UpdateUser: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { firstName, lastName, email } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).send({
                    status: 404,
                    message: 'Not found user',
                });
            }
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.save();
            return res.status(200).send({
                status: 200,
                message: 'Update successful',
                data: user,
            });
        } catch (error) {
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

    DeleteUser: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            user?.destroy();
            if (!user) {
                return res.status(404).send({
                    status: 404,
                    message: 'Not found user',
                });
            }
            return res.status(200).send({
                status: 200,
                message: 'Deleted successful',
                data: null,
            });
        } catch (error) {
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
