import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Epi } from './entities/epi.entity';
import { CreateEpiDto } from './dto/create-epi.dto';
import { UpdateEpiDto } from './dto/update-epi.dto';
import { UpdateQuantidadeEpiDto } from './dto/update-quantidade-epi.dto';

import { TipoUnidade } from '../tipo-unidade/entities/tipo-unidade.entity';
import { Fornecedor } from '../fornecedor/entities/fornecedor.entity';

@Injectable()
export class EpiService {
  constructor(
    @InjectRepository(Epi)
    private epiRepository: Repository<Epi>,

    @InjectRepository(TipoUnidade)
    private tipoUnidadeRepository: Repository<TipoUnidade>,

    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,
  ) {}

  async create(dto: CreateEpiDto): Promise<Epi> {
    const tipoUnidade = await this.tipoUnidadeRepository.findOneBy({
      id: dto.tipoUnidadeId,
    });

    if (!tipoUnidade) {
      throw new NotFoundException('Tipo de unidade não encontrado');
    }

    // Verificar duplicidade de nome
    const epiComMesmoNome = await this.epiRepository.findOne({
      where: { nome: dto.nome },
    });

    if (epiComMesmoNome) {
      throw new ConflictException('Já existe um EPI com esse nome.');
    }

    const fornecedores = dto.fornecedores?.length
      ? await this.fornecedorRepository.findBy({ id: In(dto.fornecedores) })
      : [];

    const novoEpi = this.epiRepository.create({
      nome: dto.nome,
      descricao: dto.descricao,
      certificadoAprovacao: dto.certificadoAprovacao,
      quantidade: dto.quantidade,
      quantidadeParaAviso: dto.quantidadeParaAviso,
      tipoUnidade,
      fornecedores,
      preco: dto.preco
    });

    const salvo = await this.epiRepository.save(novoEpi);
    return salvo;
  }

  async findAll(): Promise<Epi[]> {
    return this.epiRepository.find({
      relations: ['tipoUnidade', 'fornecedores'],
    });
  }

  async findAllEmFalta(): Promise<Epi[]> {
    return await this.epiRepository
      .createQueryBuilder('epi')
      .leftJoinAndSelect('epi.tipoUnidade', 'tipoUnidade')
      .where('epi.quantidade < epi.quantidadeParaAviso')
      .getMany();
  }

  async findOne(id: number): Promise<Epi> {
    const epi = await this.epiRepository.findOne({
      where: { id },
      relations: ['tipoUnidade', 'fornecedores'],
    });

    if (!epi) {
      throw new NotFoundException('EPI não encontrado');
    }

    return epi;
  }

  async findOnePorNome(nome: string): Promise<Epi> {
    const epi = await this.epiRepository.findOne({
      where: { nome },
      relations: ['tipoUnidade', 'fornecedores'],
    });

    if (!epi) {
      throw new NotFoundException('EPI não encontrado');
    }

    return epi;
  }

  async update(nomeParaEditarEpi: string, dto: UpdateEpiDto): Promise<Epi> {
    const epi = await this.findOnePorNome(nomeParaEditarEpi);
    Object.assign(epi, dto);
    if (dto.nome) epi.nome = dto.nome;
    if (dto.descricao) epi.descricao = dto.descricao;
    if (dto.certificadoAprovacao)
      epi.certificadoAprovacao = dto.certificadoAprovacao;
    if (dto.quantidade !== undefined) epi.quantidade = dto.quantidade;
    if (dto.quantidadeParaAviso !== undefined)
      epi.quantidadeParaAviso = dto.quantidadeParaAviso;

    if (dto.tipoUnidadeId) {
      const tipoUnidade = await this.tipoUnidadeRepository.findOneBy({
        id: dto.tipoUnidadeId,
      });
      if (!tipoUnidade) {
        throw new NotFoundException('Tipo de unidade não encontrado');
      }
      epi.tipoUnidade = tipoUnidade;
    }

    if (dto.fornecedores) {
      const fornecedores = await this.fornecedorRepository.findBy({
        id: In(dto.fornecedores),
      });
      epi.fornecedores = fornecedores;
    }

    return this.epiRepository.save(epi);
  }

  async entradaSaidaEpi(movimentacoes: UpdateQuantidadeEpiDto[]): Promise<Epi[]> {
    const resultados: Epi[] = [];

    for (const mov of movimentacoes) {
      const epi = await this.epiRepository.findOneBy({
        id: mov.id,
      });

      if (!epi) continue;

      epi.quantidade += mov.quantidade;
      const salvo = await this.epiRepository.save(epi);
      resultados.push(salvo);
    }

    return resultados;
  }

  async remove(id: number) {
    await this.epiRepository.delete({ id });
    return { mensagem: 'Item excluído com sucesso.' };
  }
}
