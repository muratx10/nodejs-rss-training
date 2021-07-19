import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import Board from '../../entities/board.entity';
import BoardColumn from '../../entities/column.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepo: Repository<Board>,
    @InjectRepository(BoardColumn)
    private columnsRepo: Repository<BoardColumn>
  ) {
  }

  async create(createBoardDto: CreateBoardDto) {
    const board = await this.boardsRepo.create(createBoardDto);

    return this.boardsRepo.save(board);
  }

  getAll(): Promise<Board[]> {
    return this.boardsRepo.find({ relations: ['columns'] });
  }

  getById(id: string): Promise<Board | undefined> {
    return this.boardsRepo.findOne(id, {
      relations: ['columns']
    });
  }

  async updateById(id: string, updateBoardDto: UpdateBoardDto) {
    const prevBoard = await this.boardsRepo.findOne(id, {
      relations: ['columns']
    });

    const { columns = [], title } = updateBoardDto;
    const deleteRes = prevBoard?.columns
      ?.map((column) => this.columnsRepo.delete(column.id));

    if (deleteRes) await Promise.all(deleteRes);

    const newColumns = columns.map((column) => this.columnsRepo.create(column));

    if (title) {
      const board = await this.boardsRepo.findOne(id);

      if (board) await this.boardsRepo.update(id, { title });
    }

    const board = await this.boardsRepo.findOne(id);

    await this.columnsRepo.save(newColumns);

    if (board) {
      board.columns = newColumns;

      return this.boardsRepo.save(board);
    }

    return undefined;
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.boardsRepo.delete(id);
  }

}
