import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Fornecedor } from './entities/fornecedor.entity';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';

import { Endereco } from '../endereco/entities/endereco.entity';
import { CategoriaFornecedor } from '../categoria-fornecedor/entities/categoria-fornecedor.entity';
import { Epi } from '../epi/entities/epi.entity';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    @InjectRepository(CategoriaFornecedor)
    private categoriaRepository: Repository<CategoriaFornecedor>,

    @InjectRepository(Epi)
    private epiRepository: Repository<Epi>,
  ) {}

  async create(dto: CreateFornecedorDto): Promise<Fornecedor> {
    const enderecos = await this.enderecoRepository.findBy({
      id: In(dto.enderecos),
    });

    const categoria = await this.categoriaRepository.findOneBy({
      id: dto.categoriaFornecedorId,
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const epis = dto.epis?.length
      ? await this.epiRepository.findBy({ id: In(dto.epis) })
      : [];

    const fornecedor = this.fornecedorRepository.create({
      nome: dto.nome,
      enderecos,
      categoriaFornecedor: categoria,
      epis,
    });

    const fornecedorSalvo = await this.fornecedorRepository.save(fornecedor);

    const fornecedorCompleto = await this.fornecedorRepository.findOne({
      where: { id: fornecedorSalvo.id },
      relations: ['enderecos', 'categoriaFornecedor', 'epis'],
    });

    if (!fornecedorCompleto) {
      throw new NotFoundException('Fornecedor não encontrado após salvar');
    }

    return fornecedorCompleto;
  }

  async findAll(): Promise<Fornecedor[]> {
    return this.fornecedorRepository.find({
      relations: ['enderecos', 'categoriaFornecedor', 'epis'],
    });
  }

  async findOne(id: number): Promise<Fornecedor> {
    const fornecedor = await this.fornecedorRepository.findOne({
      where: { id },
      relations: ['enderecos', 'categoriaFornecedor', 'epis'],
    });

    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return fornecedor;
  }

  async update(id: number, dto: UpdateFornecedorDto): Promise<Fornecedor> {
    const fornecedor = await this.findOne(id);

    if (dto.nome) {
      fornecedor.nome = dto.nome;
    }

    if (dto.enderecos) {
      const enderecos = await this.enderecoRepository.findBy({
        id: In(dto.enderecos),
      });
      fornecedor.enderecos = enderecos;
    }

    if (dto.categoriaFornecedorId) {
      const categoria = await this.categoriaRepository.findOneBy({
        id: dto.categoriaFornecedorId,
      });
      if (!categoria) {
        throw new NotFoundException('Categoria do fornecedor não encontrada');
      }
      fornecedor.categoriaFornecedor = categoria;
    }

    if (dto.epis) {
      const epis = await this.epiRepository.findBy({
        id: In(dto.epis),
      });
      fornecedor.epis = epis;
    }

    return this.fornecedorRepository.save(fornecedor);
  }

  async remove(id: number): Promise<void> {
    const fornecedor = await this.findOne(id);
    await this.fornecedorRepository.remove(fornecedor);
  }
}
