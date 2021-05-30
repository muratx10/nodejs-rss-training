import { v4 as uuid } from 'uuid';
class User {
    constructor({ id = uuid(), login = 'user', name = 'USER', password = 'P@55w0rd' } = {}) {
        this.id = id;
        this.login = login;
        this.name = name;
        this.password = password;
    }
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
export default User;
//# sourceMappingURL=user.model.js.map