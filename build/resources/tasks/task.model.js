import { v4 as uuid } from 'uuid';
class Task {
    constructor(task) {
        this.boardId = task.boardId || '';
        this.columnId = task.columnId;
        this.description = task.description || '';
        this.id = task.id || uuid();
        this.order = task.order || 0;
        this.title = task.title || '';
        this.userId = task.userId;
    }
}
export default Task;
//# sourceMappingURL=task.model.js.map