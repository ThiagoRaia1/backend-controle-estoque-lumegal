import { Module } from '@nestjs/common';
import { EntradaSaidaSuprimentoService } from './entrada-saida-suprimento.service';
import { EntradaSaidaSuprimentoController } from './entrada-saida-suprimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradaSaidaSuprimento } from './entities/entrada-saida-suprimento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaSaidaSuprimento])],
  controllers: [EntradaSaidaSuprimentoController],
  providers: [EntradaSaidaSuprimentoService],
})
export class EntradaSaidaSuprimentoModule {}
