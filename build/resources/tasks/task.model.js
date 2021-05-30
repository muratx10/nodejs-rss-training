import { v4 as uuid } from 'uuid';
class Task {
    constructor({ boardId = '', columnId = '', description = 'test description', id = uuid(), order = 0, title = 'Task1', userId = '', } = {}) {
        this.boardId = boardId;
        this.columnId = columnId;
        this.description = description;
        this.id = id;
        this.order = order;
        this.title = title;
        this.userId = userId;
    }
}
export default Task;
//# sourceMappingURL=task.model.js.map