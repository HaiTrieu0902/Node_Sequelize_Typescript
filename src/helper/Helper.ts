import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

interface IStaff {
    id?: string;
    userName?: string | null;
    email?: string | null;
    role?: string | null;
    roleId?: number | null;
}

const ResponseData = (status: number, message: string | null, error: any | null, data: any | null) => {
    if (error !== null && error instanceof Error) {
        const response = {
            status: status,
            message: error.message,
            errors: error,
        };
        return response;
    }
    if (error) {
        const res = {
            status,
            message,
            error: error,
        };
        return res;
    }
    const res = {
        status,
        message,
        data: data,
    };

    return res;
};

const GenerationToken = (data: any) => {
    const token = jwt.sign(data, process.env.JWT_TOKEN as string);
    return token;
};

const RefreshToken = (data: any) => {
    const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string);
    return token;
};

const EtractToken = (token: string): IStaff | null => {
    const secretKey: string = process.env.JWT_TOKEN as string;
    let data: any;

    const res = jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            data = null;
        } else {
            data = decoded;
        }
    });

    if (data) {
        const result: IStaff = <IStaff>data;
        return result;
    }

    return null;
};

const EtractRefreshToken = (token: string): IStaff | null => {
    const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;
    let data: any;

    const res = jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            data = null;
        } else {
            data = decoded;
        }
    });

    if (data) {
        const result: IStaff = <IStaff>data;
        return result;
    }

    return null;
};

export default { ResponseData, GenerationToken, RefreshToken, EtractToken, EtractRefreshToken };
