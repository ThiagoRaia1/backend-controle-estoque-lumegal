import { Module } from '@nestjs/common';
import { CategoriaFornecedorService } from './categoria-fornecedor.service';
import { CategoriaFornecedorController } from './categoria-fornecedor.controller';
import { CategoriaFornecedor } from './entities/categoria-fornecedor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaFornecedor])],
  controllers: [CategoriaFornecedorController],
  providers: [CategoriaFornecedorService],
})
export class CategoriaFornecedorModule {}
