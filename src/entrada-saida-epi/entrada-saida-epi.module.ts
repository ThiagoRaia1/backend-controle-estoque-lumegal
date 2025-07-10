import { Module } from '@nestjs/common';
import { EntradaSaidaEpiService } from './entrada-saida-epi.service';
import { EntradaSaidaEpiController } from './entrada-saida-epi.controller';
import { EntradaSaidaEpi } from './entities/entrada-saida-epi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaSaidaEpi])],
  controllers: [EntradaSaidaEpiController],
  providers: [EntradaSaidaEpiService],
})
export class EntradaSaidaEpiModule {}
