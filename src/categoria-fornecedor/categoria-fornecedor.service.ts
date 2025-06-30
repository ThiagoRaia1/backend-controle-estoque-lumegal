import { Injectable } from '@nestjs/common';
import { CreateCategoriaFornecedorDto } from './dto/create-categoria-fornecedor.dto';
import { UpdateCategoriaFornecedorDto } from './dto/update-categoria-fornecedor.dto';

@Injectable()
export class CategoriaFornecedorService {
  create(createCategoriaFornecedorDto: CreateCategoriaFornecedorDto) {
    return 'This action adds a new categoriaFornecedor';
  }

  findAll() {
    return `This action returns all categoriaFornecedor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriaFornecedor`;
  }

  update(id: number, updateCategoriaFornecedorDto: UpdateCategoriaFornecedorDto) {
    return `This action updates a #${id} categoriaFornecedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriaFornecedor`;
  }
}
