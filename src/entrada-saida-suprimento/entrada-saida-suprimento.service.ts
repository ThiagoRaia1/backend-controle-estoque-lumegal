import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { EntradaSaidaSuprimento } from './entities/entrada-saida-suprimento.entity';
import { CreateEntradaSaidaSuprimentoDto } from './dto/create-entrada-saida-suprimento.dto';
import { UpdateEntradaSaidaSuprimentoDto } from './dto/update-entrada-saida-suprimento.dto';

@Injectable()
export class EntradaSaidaSuprimentoService {
  constructor(
    @InjectRepository(EntradaSaidaSuprimento)
    private entradaSaidaSuprimentoRepository: Repository<EntradaSaidaSuprimento>,
  ) {}

  async create(
    createEntradaSaidaSuprimentoDto: CreateEntradaSaidaSuprimentoDto[],
  ) {
    const horario = new Date();
    const dadosComData = createEntradaSaidaSuprimentoDto.map((item) => ({
      ...item,
      data: horario, // sobrescreve ou define a data
      suprimento: { id: item.idSuprimento },
    }));

    const salvos =
      await this.entradaSaidaSuprimentoRepository.save(dadosComData);
    return salvos;
  }

  findAll() {
    return `This action returns all entradaSaida`;
  }

  async findRelatorio(
    dataInicial: Date,
    dataFinal: Date,
  ): Promise<EntradaSaidaSuprimento[]> {
    return await this.entradaSaidaSuprimentoRepository.find({
      where: {
        data: Between(dataInicial, dataFinal),
      },
      relations: ['suprimento'], // Inclui o suprimento relacionado (se quiser no resultado)
      order: {
        data: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} entradaSaida`;
  }

  update(
    id: number,
    updateEntradaSaidaSuprimentoDto: UpdateEntradaSaidaSuprimentoDto,
  ) {
    return `This action updates a #${id} entradaSaida`;
  }

  remove(id: number) {
    return `This action removes a #${id} entradaSaida`;
  }
}
