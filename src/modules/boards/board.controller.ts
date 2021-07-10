import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardService } from "./board.service";

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  async getAll() {
    return this.boardService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const board = await this.boardService.getById(id);

    if (board) return board;

    throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const res = await this.boardService.updateById(id, updateBoardDto);

    if (res) return res;

    throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const res = await this.boardService.deleteById(id);

    if (res) return res;

    throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
