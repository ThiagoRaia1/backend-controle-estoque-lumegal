import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateEntradaSaidaSuprimentoDto } from './dto/update-entrada-saida-suprimento.dto';
import { CreateEntradaSaidaSuprimentoDto } from './dto/create-entrada-saida-suprimento.dto';
import { EntradaSaidaSuprimentoService } from './entrada-saida-suprimento.service';

@Controller('entrada-saida-suprimento')
export class EntradaSaidaSuprimentoController {
  constructor(
    private readonly entradaSaidaSuprimentoService: EntradaSaidaSuprimentoService,
  ) {}

  @Post()
  create(
    @Body() createEntradaSaidaSuprimentoDto: CreateEntradaSaidaSuprimentoDto[],
  ) {
    console.log('Criando registro de entregaSaida ' + new Date());
    return this.entradaSaidaSuprimentoService.create(
      createEntradaSaidaSuprimentoDto,
    );
  }

  @Get()
  findAll() {
    return this.entradaSaidaSuprimentoService.findAll();
  }

  @Get(':dataInicial/:dataFinal')
  findRelatorio(
    @Param('dataInicial') dataInicial: string,
    @Param('dataFinal') dataFinal: string,
  ) {
    console.log('entrega-saida/:dataInicial/:dataFinal');
    const inicio = new Date(dataInicial);
    const fim = new Date(dataFinal);
    console.log(inicio);
    console.log(fim);
    return this.entradaSaidaSuprimentoService.findRelatorio(inicio, fim);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entradaSaidaSuprimentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntradaSaidaSuprimentoDto: UpdateEntradaSaidaSuprimentoDto,
  ) {
    return this.entradaSaidaSuprimentoService.update(
      +id,
      updateEntradaSaidaSuprimentoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entradaSaidaSuprimentoService.remove(+id);
  }
}
