import { Injectable } from '@nestjs/common';
import { CreateTipoUnidadeDto } from './dto/create-tipo-unidade.dto';
import { UpdateTipoUnidadeDto } from './dto/update-tipo-unidade.dto';

@Injectable()
export class TipoUnidadeService {
  create(createTipoUnidadeDto: CreateTipoUnidadeDto) {
    return 'This action adds a new tipoUnidade';
  }

  findAll() {
    return `This action returns all tipoUnidade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoUnidade`;
  }

  update(id: number, updateTipoUnidadeDto: UpdateTipoUnidadeDto) {
    return `This action updates a #${id} tipoUnidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoUnidade`;
  }
}
