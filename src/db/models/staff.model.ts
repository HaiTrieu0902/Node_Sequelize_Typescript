import { DataType, DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/connectDB';

interface StaffAttributes {
    id?: number;
    userName?: string;
    email?: string;
    role?: string;
    password?: string;
    accesstoken?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface StaffInput extends Optional<StaffAttributes, 'id'> {}
export interface StaffOutput extends Required<StaffAttributes> {}

class Staff extends Model<StaffAttributes, StaffInput> implements StaffAttributes {
    public id!: number;
    public userName!: string;
    public email!: string;
    public role!: string;
    public password!: string;
    public accesstoken!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Staff.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        userName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        role: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        accesstoken: {
            allowNull: true,
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: connection,
        underscored: false,
    },
);

export default Staff;
