import { create as createUser, deleteById as deleteUserById, getAll as getAllUsers, getById as getUserById, updateById as updateUserById } from './user.memory.repository';
import { removeUsersTasks } from '../tasks/task.memory.repository';
export const create = (data) => createUser(data);
export const deleteById = (id) => {
    removeUsersTasks(id);
    return deleteUserById(id);
};
export const getAll = () => getAllUsers();
export const getById = (id) => getUserById(id);
export const updateById = (id, data) => updateUserById(id, data);
//# sourceMappingURL=user.service.js.map