import { Injectable } from '@nestjs/common';
import { CreateEntradaSaidaDto } from './dto/create-entrada-saida.dto';
import { UpdateEntradaSaidaDto } from './dto/update-entrada-saida.dto';

@Injectable()
export class EntradaSaidaService {
  create(createEntradaSaidaDto: CreateEntradaSaidaDto) {
    return 'This action adds a new entradaSaida';
  }

  findAll() {
    return `This action returns all entradaSaida`;
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
