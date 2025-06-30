import { Module } from '@nestjs/common';
import { TipoUnidadeService } from './tipo-unidade.service';
import { TipoUnidadeController } from './tipo-unidade.controller';

@Module({
  controllers: [TipoUnidadeController],
  providers: [TipoUnidadeService],
})
export class TipoUnidadeModule {}
