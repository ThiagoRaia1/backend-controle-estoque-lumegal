import { Injectable } from '@nestjs/common';
import { CreateEpiDto } from './dto/create-epi.dto';
import { UpdateEpiDto } from './dto/update-epi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Epi } from './entities/epi.entity';

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

  remove(id: number) {
    return `This action removes a #${id} epi`;
  }
}
