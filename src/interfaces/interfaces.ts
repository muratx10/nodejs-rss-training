export interface IColumn {
  id: string,
  title: string,
  order: number,
}

export interface IBoard {
  id: string,
  title: string,
  columns: IColumn[]
}

export interface ITask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string | null,
  boardId: string,
  columnId: string | null,
}

export interface IUser {
  id: string,
  name: string,
  login: string,
  passwordHash: string
}

export interface IUserResponse {
  id: string,
  name: string,
  login: string,
}
