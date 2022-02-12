import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import sequelizeConnection from '../util/database'

export interface UserDTO {
    id: number;
    username: string;
    email: string;
    password: string;
}
export interface OutputUserDTO extends Required<UserDTO> {}
export interface InputUserDTO extends Optional<UserDTO, 'id' > {}

class User extends Model<UserDTO, InputUserDTO> implements UserDTO {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: sequelizeConnection,
    paranoid: true
});

export default User;
