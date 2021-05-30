import { v1 as uuid } from 'uuid';
export default class Column {
    constructor(options) {
        this.id = options.id || uuid();
        this.title = options.title || '';
        this.order = options.order || 0;
    }
    static toResponse(column) {
        const { id, title, order } = column;
        return { id, title, order };
    }
    static fromRequest(column) {
        const { id, title, order } = column;
        return { id, title, order };
    }
}
//# sourceMappingURL=column.model.js.map