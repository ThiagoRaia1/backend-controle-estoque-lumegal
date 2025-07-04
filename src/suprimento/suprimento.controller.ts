import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SuprimentoService } from './suprimento.service';
import { CreateSuprimentoDto } from './dto/create-suprimento.dto';
import { UpdateSuprimentoDto } from './dto/update-suprimento.dto';
import { UpdateQuantidadeSuprimentoDto } from './dto/update-quantidade-suprimento.dto';

@Controller('suprimento')
export class SuprimentoController {
  constructor(private readonly suprimentoService: SuprimentoService) {}

  @Post()
  create(@Body() createSuprimentoDto: CreateSuprimentoDto) {
    console.log('create');
    return this.suprimentoService.create(createSuprimentoDto);
  }

  @Get()
  findAll() {
    console.log('findAll');
    return this.suprimentoService.findAll();
  }

  @Get('emFalta')
  findAllEmFalta() {
    console.log('findAllEmFalta');
    return this.suprimentoService.findAllEmFalta();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: number) {
    console.log('findOne');
    return this.suprimentoService.findOne(id);
  }

  @Patch('editarDados/:nomeParaEditarSuprimento')
  update(
    @Body() updateSuprimentoDto: UpdateSuprimentoDto,
    @Param('nomeParaEditarSuprimento') nomeParaEditarSuprimento: string,
  ) {
    console.log('editarDados');
    return this.suprimentoService.update(
      nomeParaEditarSuprimento,
      updateSuprimentoDto,
    );
  }

  @Patch('entradaSaida')
  entradaSaida(
    @Body()
    movimentacoes: UpdateQuantidadeSuprimentoDto[],
  ) {
    console.log('Registrando movimentação ' + new Date());
    return this.suprimentoService.entradaSaidaSuprimento(movimentacoes);
  }

  @Delete('excluir/:id')
  async excluir(@Param('id') id: number) {
    console.log('excluir');
    return this.suprimentoService.remove(id);
  }
}
