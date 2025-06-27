import { Injectable } from '@nestjs/common';
import { CreateEpiDto } from './dto/create-epi.dto';
import { UpdateEpiDto } from './dto/update-epi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
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
    return this.epiRepository.manager.connection
      .getMongoRepository(Epi)
      .aggregate([
        {
          $match: {
            $expr: {
              $lt: ['$quantidade', '$quantidadeParaAviso'],
            },
          },
        },
      ])
      .toArray();
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
      console.log(mov.nome);
      const epi = await this.epiRepository.findOneBy({
        _id: new ObjectId(mov._id),
      });

      if (!epi) {
        continue;
      }

      epi.quantidade += mov.quantidade; // entrada (positivo) ou saída (negativo)

      const salvo = await this.epiRepository.save(epi);
      console.log(salvo);
      resultados.push(salvo);
    }

    return resultados;
  }

  async remove(id: string) {
    await this.epiRepository.delete({ _id: new ObjectId(id) });
    return { mensagem: 'Item excluído com sucesso.' };
  }
}
