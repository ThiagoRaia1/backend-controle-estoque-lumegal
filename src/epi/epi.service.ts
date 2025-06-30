import { Injectable } from '@nestjs/common';
import { CreateEpiDto } from './dto/create-epi.dto';
import { UpdateEpiDto } from './dto/update-epi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Epi } from './entities/epi.entity';
import { UpdateQuantidadeEpi } from './dto/updateQuantidadeEpi.dto';

@Injectable()
export class EpiService {
  constructor(
    @InjectRepository(Epi)
    private epiRepository: Repository<Epi>,
  ) {}

  /**
   * Cria um novo EPI
   * @param createEpiDto - Dados do EPI a ser criado
   * @returns O EPI criado
   */
  create(createEpiDto: CreateEpiDto): Promise<Epi> {
    const novoEpi = this.epiRepository.create(createEpiDto);
    return this.epiRepository.save(novoEpi);
  }

  findAll() {
    return this.epiRepository.find();
    // return `This action returns all epi`;
  }

  async findAllEmFalta(): Promise<Epi[]> {
    return this.epiRepository
      .createQueryBuilder('epi')
      .where('epi.quantidade < epi.quantidadeParaAviso')
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} epi`;
  }

  update(id: number, updateEpiDto: UpdateEpiDto) {
    return `This action updates a #${id} epi`;
  }

  async entradaSaidaEpi(movimentacoes: UpdateQuantidadeEpi[]): Promise<Epi[]> {
    const resultados: Epi[] = [];

    for (const mov of movimentacoes) {
      const epi = await this.epiRepository.findOneBy({
        id: mov.id,
      });

      if (!epi) {
        continue;
      }

      epi.quantidade += mov.quantidade; // entrada (positivo) ou saída (negativo)

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
