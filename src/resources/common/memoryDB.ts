class MemoryDB<KEY, VALUE> {
  private _data: Map<KEY, VALUE>;

  constructor() {
    this._data = new Map();
  }

  async getAll(): Promise<VALUE[]> {
    return Array.from(this._data.values());
  }

  async getById(id: KEY): Promise<VALUE | undefined> {
    return this._data.get(id);
  }

  async create(id: KEY, item: VALUE): Promise<VALUE> {
    this._data.set(id, item);

    return item;
  }

  async update(id: KEY, item: Partial<VALUE>): Promise<VALUE> {
    const updatedItem = {
      ...this._data.get(id),
      ...item
    } as VALUE;

    this._data.set(id, updatedItem);

    return updatedItem;
  }

  async deleteById(id: KEY): Promise<VALUE | undefined> {
    const deletedItem = this._data.get(id);

    this._data.delete(id);

    return deletedItem;
  }
}

export default MemoryDB;
