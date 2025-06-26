import { Module } from '@nestjs/common';
import { EpiService } from './epi.service';
import { EpiController } from './epi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epi } from './entities/epi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Epi])],
  controllers: [EpiController],
  providers: [EpiService],
})
export class EpiModule {}
