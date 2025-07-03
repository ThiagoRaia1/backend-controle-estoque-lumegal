import { Injectable } from '@nestjs/common';
import { CreateEntradaSaidaDto } from './dto/create-entrada-saida.dto';
import { UpdateEntradaSaidaDto } from './dto/update-entrada-saida.dto';
import { EntradaSaida } from './entities/entrada-saida.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class EntradaSaidaService {
  constructor(
    @InjectRepository(EntradaSaida)
    private entradaSaidaRepository: Repository<EntradaSaida>,
  ) {}

  async create(createEntradaSaidaDto: CreateEntradaSaidaDto[]) {
    const horario = new Date();
    const dadosComData = createEntradaSaidaDto.map((item) => ({
      ...item,
      data: horario, // sobrescreve ou define a data
      epi: { id: item.idEpi },
    }));

    const salvos = await this.entradaSaidaRepository.save(dadosComData);
    return salvos;
  }

  findAll() {
    return `This action returns all entradaSaida`;
  }

  async findRelatorio(
    dataInicial: Date,
    dataFinal: Date,
  ): Promise<EntradaSaida[]> {
    return await this.entradaSaidaRepository.find({
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

  update(id: number, updateEntradaSaidaDto: UpdateEntradaSaidaDto) {
    return `This action updates a #${id} entradaSaida`;
  }

  remove(id: number) {
    return `This action removes a #${id} entradaSaida`;
  }
}
