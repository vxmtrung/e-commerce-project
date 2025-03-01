import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewEntity } from "./domains/entities/review.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  controllers: [],
  exports: [],
  providers: []
})

export class ReviewModule {}