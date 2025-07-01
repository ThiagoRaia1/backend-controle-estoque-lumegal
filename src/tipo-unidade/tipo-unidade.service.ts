import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TipoUnidade } from './entities/tipo-unidade.entity';
import { CreateTipoUnidadeDto } from './dto/create-tipo-unidade.dto';
import { UpdateTipoUnidadeDto } from './dto/update-tipo-unidade.dto';

@Injectable()
export class TipoUnidadeService {
  constructor(
    @InjectRepository(TipoUnidade)
    private tipoUnidadeRepository: Repository<TipoUnidade>,
  ) {}

  async create(createTipoUnidadeDto: CreateTipoUnidadeDto): Promise<TipoUnidade> {
    try {
      const existente = await this.tipoUnidadeRepository.findOne({
        where: { tipo: createTipoUnidadeDto.tipo },
      });

      if (existente) {
        throw new ConflictException('Já existe um tipo com esse nome.');
      }

      const nova = this.tipoUnidadeRepository.create(createTipoUnidadeDto);
      const salvo = await this.tipoUnidadeRepository.save(nova);
      return salvo
    } catch (error) {
      if (error.code === '23505') {
        // Código de erro de duplicidade no Postgres
        throw new ConflictException('Já existe um tipo com esse nome.');
      }
      throw error;
    }
  }

  async findAll(): Promise<TipoUnidade[]> {
    return this.tipoUnidadeRepository.find();
  }

  async findOne(id: number): Promise<TipoUnidade> {
    const tipo = await this.tipoUnidadeRepository.findOneBy({ id });

    if (!tipo) {
      throw new NotFoundException('Tipo de unidade não encontrado');
    }

    return tipo;
  }

  async update(id: number, dto: UpdateTipoUnidadeDto): Promise<TipoUnidade> {
    const tipo = await this.findOne(id);

    tipo.tipo = dto.tipo ?? tipo.tipo;

    return this.tipoUnidadeRepository.save(tipo);
  }

  async remove(id: number): Promise<void> {
    const tipo = await this.findOne(id);
    await this.tipoUnidadeRepository.remove(tipo);
  }
}
