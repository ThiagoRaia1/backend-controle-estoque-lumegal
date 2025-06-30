import { Module } from '@nestjs/common';
import { EntradaSaidaService } from './entrada-saida.service';
import { EntradaSaidaController } from './entrada-saida.controller';

@Module({
  controllers: [EntradaSaidaController],
  providers: [EntradaSaidaService],
})
export class EntradaSaidaModule {}
