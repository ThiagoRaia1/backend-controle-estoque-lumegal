import { Module } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';
import { Fornecedor } from './entities/fornecedor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaFornecedor } from 'src/categoria-fornecedor/entities/categoria-fornecedor.entity';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Epi } from 'src/epi/entities/epi.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fornecedor, Endereco, CategoriaFornecedor, Epi]),
  ],
  controllers: [FornecedorController],
  providers: [FornecedorService],
})
export class FornecedorModule {}
