import { Module } from '@nestjs/common';
import { CategoriaFornecedorService } from './categoria-fornecedor.service';
import { CategoriaFornecedorController } from './categoria-fornecedor.controller';

@Module({
  controllers: [CategoriaFornecedorController],
  providers: [CategoriaFornecedorService],
})
export class CategoriaFornecedorModule {}
