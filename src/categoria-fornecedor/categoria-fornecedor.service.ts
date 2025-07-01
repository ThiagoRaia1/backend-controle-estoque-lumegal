import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoriaFornecedorDto } from './dto/create-categoria-fornecedor.dto';
import { UpdateCategoriaFornecedorDto } from './dto/update-categoria-fornecedor.dto';
import { CategoriaFornecedor } from './entities/categoria-fornecedor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaFornecedorService {
  constructor(
    @InjectRepository(CategoriaFornecedor)
    private categoriaFornecedorRepository: Repository<CategoriaFornecedor>,
  ) {}

  /**
   * Cria uma nova categoria de fornecedor
   * @param createCategoriaFornecedorDto - Dados da categoria do fornecedor a ser criado
   * @returns O fornecedor criado
   */
  async create(
    dto: CreateCategoriaFornecedorDto,
  ): Promise<CategoriaFornecedor> {
    const existente = await this.categoriaFornecedorRepository.findOne({
      where: { categoria: dto.categoria },
    });

    if (existente) {
      throw new ConflictException('Já existe uma categoria com esse nome.');
    }

    const nova = this.categoriaFornecedorRepository.create(dto);
    return this.categoriaFornecedorRepository.save(nova);
  }

  findAll() {
    return `This action returns all categoriaFornecedor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriaFornecedor`;
  }

  update(
    id: number,
    updateCategoriaFornecedorDto: UpdateCategoriaFornecedorDto,
  ) {
    return `This action updates a #${id} categoriaFornecedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriaFornecedor`;
  }
}
