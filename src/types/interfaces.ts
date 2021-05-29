export interface IUser {
  id?: string,
  login?: string,
  name?: string,
  password?: string,
}

export interface IColumn {
  id?: string,
  title: string,
  order: string,
}

export interface IBoard {
  id?: string,
  title?: string,
  columns?: IColumn[],
}

export interface ITask {
  boardId?: string,
  columnId?: string,
  description?: string,
  id?: string,
  order?: number,
  title?: string,
  userId?: string,
}

export interface IRequestParams {
  id?: string,
  boardId?: string,
}
