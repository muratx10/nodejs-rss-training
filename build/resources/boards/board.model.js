import { v4 as uuid } from 'uuid';
class Board {
    constructor({ id = uuid(), title = 'board', columns = [{
            id: uuid(),
            title: 'Column title',
            order: 0,
        }], } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }
}
export default Board;
//# sourceMappingURL=board.model.js.map