import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Suprimento } from './entities/suprimento.entity';
import { CreateSuprimentoDto } from './dto/create-suprimento.dto';
import { UpdateSuprimentoDto } from './dto/update-suprimento.dto';
import { UpdateQuantidadeSuprimentoDto } from './dto/update-quantidade-suprimento.dto';

import { TipoUnidade } from '../tipo-unidade/entities/tipo-unidade.entity';
import { Fornecedor } from '../fornecedor/entities/fornecedor.entity';

@Injectable()
export class SuprimentoService {
  constructor(
    @InjectRepository(Suprimento)
    private suprimentoRepository: Repository<Suprimento>,

    @InjectRepository(TipoUnidade)
    private tipoUnidadeRepository: Repository<TipoUnidade>,

    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,
  ) {}

  async create(dto: CreateSuprimentoDto): Promise<Suprimento> {
    const tipoUnidade = await this.tipoUnidadeRepository.findOneBy({
      id: dto.tipoUnidadeId,
    });

    if (!tipoUnidade) {
      throw new NotFoundException('Tipo de unidade não encontrado');
    }

    // Verificar duplicidade de nome
    const suprimentoComMesmoNome = await this.suprimentoRepository.findOne({
      where: { nome: dto.nome },
    });

    if (suprimentoComMesmoNome) {
      throw new ConflictException('Já existe um suprimento com esse nome.');
    }

    const fornecedores = dto.fornecedores?.length
      ? await this.fornecedorRepository.findBy({ id: In(dto.fornecedores) })
      : [];

    const novoSuprimento = this.suprimentoRepository.create({
      nome: dto.nome,
      descricao: dto.descricao,
      quantidade: dto.quantidade,
      quantidadeParaAviso: dto.quantidadeParaAviso,
      preco: dto.preco,
      tipoUnidade,
      fornecedores,
    });

    const salvo = await this.suprimentoRepository.save(novoSuprimento);
    return salvo;
  }

  async findAll(): Promise<Suprimento[]> {
    return this.suprimentoRepository.find({
      relations: ['tipoUnidade', 'fornecedores'],
    });
  }

  async findAllEmFalta(): Promise<Suprimento[]> {
    return await this.suprimentoRepository
      .createQueryBuilder('suprimento')
      .leftJoinAndSelect('suprimento.tipoUnidade', 'tipoUnidade')
      .where('suprimento.quantidade < suprimento.quantidadeParaAviso')
      .getMany();
  }

  async findOne(id: number): Promise<Suprimento> {
    const suprimento = await this.suprimentoRepository.findOne({
      where: { id },
      relations: ['tipoUnidade', 'fornecedores'],
    });

    if (!suprimento) {
      throw new NotFoundException('Suprimento não encontrado');
    }

    return suprimento;
  }

  async findOnePorNome(nome: string): Promise<Suprimento> {
    const suprimento = await this.suprimentoRepository.findOne({
      where: { nome },
      relations: ['tipoUnidade', 'fornecedores'],
    });

    if (!suprimento) {
      throw new NotFoundException('Suprimento não encontrado');
    }

    return suprimento;
  }

  async update(
    nomeParaEditarSuprimento: string,
    dto: UpdateSuprimentoDto,
  ): Promise<Suprimento> {
    const suprimento = await this.findOnePorNome(nomeParaEditarSuprimento);
    Object.assign(suprimento, dto);
    if (dto.nome) suprimento.nome = dto.nome;
    if (dto.descricao) suprimento.descricao = dto.descricao;
    if (dto.quantidade !== undefined) suprimento.quantidade = dto.quantidade;
    if (dto.quantidadeParaAviso !== undefined)
      suprimento.quantidadeParaAviso = dto.quantidadeParaAviso;
    if (dto.preco !== undefined)
      suprimento.preco = dto.preco;

    if (dto.tipoUnidadeId) {
      const tipoUnidade = await this.tipoUnidadeRepository.findOneBy({
        id: dto.tipoUnidadeId,
      });
      if (!tipoUnidade) {
        throw new NotFoundException('Tipo de unidade não encontrado');
      }
      suprimento.tipoUnidade = tipoUnidade;
    }

    if (dto.fornecedores) {
      const fornecedores = await this.fornecedorRepository.findBy({
        id: In(dto.fornecedores),
      });
      suprimento.fornecedores = fornecedores;
    }

    return this.suprimentoRepository.save(suprimento);
  }

  async entradaSaidaSuprimento(
    movimentacoes: UpdateQuantidadeSuprimentoDto[],
  ): Promise<Suprimento[]> {
    const resultados: Suprimento[] = [];

    for (const mov of movimentacoes) {
      const suprimento = await this.suprimentoRepository.findOneBy({
        id: mov.id,
      });

      if (!suprimento) continue;

      suprimento.quantidade += mov.quantidade;
      const salvo = await this.suprimentoRepository.save(suprimento);
      resultados.push(salvo);
    }

    return resultados;
  }

  async remove(id: number) {
    await this.suprimentoRepository.delete({ id });
    return { mensagem: 'Item excluído com sucesso.' };
  }
}
