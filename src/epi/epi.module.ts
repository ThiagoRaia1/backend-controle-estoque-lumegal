import { Module } from '@nestjs/common';
import { EpiService } from './epi.service';
import { EpiController } from './epi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epi } from './entities/epi.entity';
import { TipoUnidade } from 'src/tipo-unidade/entities/tipo-unidade.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Epi, TipoUnidade, Fornecedor])],
  controllers: [EpiController],
  providers: [EpiService],
})
export class EpiModule {}
