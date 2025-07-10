import { Injectable } from '@nestjs/common';
import { CreateEntradaSaidaEpiDto } from './dto/create-entrada-saida-epi.dto';
import { UpdateEntradaSaidaEpiDto } from './dto/update-entrada-saida-epi.dto';
import { EntradaSaidaEpi } from './entities/entrada-saida-epi.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class EntradaSaidaEpiService {
  constructor(
    @InjectRepository(EntradaSaidaEpi)
    private entradaSaidaEpiRepository: Repository<EntradaSaidaEpi>,
  ) {}

  async create(createEntradaSaidaEpiDto: CreateEntradaSaidaEpiDto[]) {
    const horario = new Date();
    const dadosComData = createEntradaSaidaEpiDto.map((item) => ({
      ...item,
      data: horario, // sobrescreve ou define a data
      epi: { id: item.idEpi },
    }));

    const salvos = await this.entradaSaidaEpiRepository.save(dadosComData);
    return salvos;
  }

  findAll() {
    return `This action returns all entradaSaida`;
  }

  async findRelatorio(
    dataInicial: Date,
    dataFinal: Date,
  ): Promise<EntradaSaidaEpi[]> {
    return await this.entradaSaidaEpiRepository.find({
      where: {
        data: Between(dataInicial, dataFinal),
      },
      relations: ['epi'], // Inclui o EPI relacionado (se quiser no resultado)
      order: {
        data: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} entradaSaida`;
  }

  update(id: number, updateEntradaSaidaEpiDto: UpdateEntradaSaidaEpiDto) {
    return `This action updates a #${id} entradaSaida`;
  }

  remove(id: number) {
    return `This action removes a #${id} entradaSaida`;
  }
}
