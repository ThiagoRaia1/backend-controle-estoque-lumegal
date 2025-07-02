import { Module } from '@nestjs/common';
import { EntradaSaidaService } from './entrada-saida.service';
import { EntradaSaidaController } from './entrada-saida.controller';
import { EntradaSaida } from './entities/entrada-saida.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaSaida])],
  controllers: [EntradaSaidaController],
  providers: [EntradaSaidaService],
})
export class EntradaSaidaModule {}
