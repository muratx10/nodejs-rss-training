"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration = exports.Migration1624280111976 = void 0;
class Migration1624280111976 {
    constructor() {
        this.name = 'Migration1624280111976';
    }
    // eslint-disable-next-line class-methods-use-this
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
      "name" VARCHAR(255) NOT NULL,
      "login" VARCHAR(255) NOT NULL,
      "passwordHash" VARCHAR(255) NOT NULL,
      CONSTRAINT "PK_user" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "board_column" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
      "title" VARCHAR(255) NOT NULL,
      "order" INTEGER NOT NULL,
      "boardId" UUID NOT NULL,
      CONSTRAINT "PK_board_column" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "board" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
      "title" VARCHAR(255) NOT NULL,
      CONSTRAINT "PK_board" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "task" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
      "title" VARCHAR(255) NOT NULL,
      "order" INTEGER NOT NULL,
      "description" VARCHAR(255) NOT NULL,
      "boardId" UUID NOT NULL,
      "columnId" UUID,
      "userId" UUID,
      CONSTRAINT "PK_task" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`ALTER TABLE "board_column"
      ADD CONSTRAINT "FK_boards_board_columns"
      FOREIGN KEY ("boardId") REFERENCES "board"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
        await queryRunner.query(`ALTER TABLE "task"
      ADD CONSTRAINT "FK_boards_tasks"
      FOREIGN KEY ("boardId") REFERENCES "board"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
        await queryRunner.query(`ALTER TABLE "task"
      ADD CONSTRAINT "FK_board_columns_tasks"
      FOREIGN KEY ("columnId") REFERENCES "board_column"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
        await queryRunner.query(`ALTER TABLE "task"
      ADD CONSTRAINT "FK_users_tasks"
      FOREIGN KEY ("userId") REFERENCES "user"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
    }
    // eslint-disable-next-line class-methods-use-this
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task"
      DROP CONSTRAINT "FK_users_tasks"
    `);
        await queryRunner.query(`ALTER TABLE "task"
      DROP CONSTRAINT "FK_board_columns_tasks"
    `);
        await queryRunner.query(`ALTER TABLE "task"
      DROP CONSTRAINT "FK_boards_tasks"
    `);
        await queryRunner.query(`ALTER TABLE "board_column"
      DROP CONSTRAINT "FK_boards_board_columns"
    `);
        await queryRunner.query("DROP TABLE \"task\"");
        await queryRunner.query("DROP TABLE \"user\"");
        await queryRunner.query("DROP TABLE \"board\"");
        await queryRunner.query("DROP TABLE \"board_column\"");
    }
}
exports.Migration1624280111976 = Migration1624280111976;
exports.Migration = Migration1624280111976;
