import { Optional } from "sequelize/types"
 export interface UserDTO {
    id: number;
    username: string;
    email: string;
    password: string;
}
export interface OutputUserDTO extends Required<UserDTO> {}
export interface InputUserDTO extends Optional<UserDTO, 'id' > {}

export const toUser = (user: OutputUserDTO): UserDTO => ({
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
})

export type CreateUserDTO = {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export type UpdateUserDTO = Optional<CreateUserDTO, 'id'>

