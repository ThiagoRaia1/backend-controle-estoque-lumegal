import { Module } from '@nestjs/common';
import { SuprimentoService } from './suprimento.service';
import { SuprimentoController } from './suprimento.controller';
import { Suprimento } from './entities/suprimento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { TipoUnidade } from 'src/tipo-unidade/entities/tipo-unidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suprimento, Fornecedor, TipoUnidade])],
  controllers: [SuprimentoController],
  providers: [SuprimentoService],
})
export class SuprimentoModule {}
