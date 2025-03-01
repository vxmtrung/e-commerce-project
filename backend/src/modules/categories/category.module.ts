import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./domains/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [],
    exports: [],
    providers: []
})

export class CategoryModule {}