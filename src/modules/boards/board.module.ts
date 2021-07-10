import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Board from "entities/board.entity";
import BoardColumn from '../../entities/column.entity';
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([BoardColumn]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
