import User from "./user.model";
import { create as createUser, deleteById as deleteUserById, getAll as getAllUsers, getById as getUserById, updateById as updateUserById } from './user.memory.repository';
import { removeUsersTasks } from '../tasks/task.memory.repository';
export const create = async (data) => createUser(new User(data));
export const deleteById = async (id) => {
    removeUsersTasks(id);
    return deleteUserById(id);
};
export const getAll = async () => Object.values(await getAllUsers());
export const getById = async (id) => getUserById(id);
export const updateById = async (id, data) => updateUserById(id, data);
//# sourceMappingURL=user.service.js.map