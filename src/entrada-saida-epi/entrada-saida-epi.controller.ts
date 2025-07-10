import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntradaSaidaEpiService } from './entrada-saida-epi.service';
import { CreateEntradaSaidaEpiDto } from './dto/create-entrada-saida-epi.dto';
import { UpdateEntradaSaidaEpiDto } from './dto/update-entrada-saida-epi.dto';

@Controller('entrada-saida-epi')
export class EntradaSaidaEpiController {
  constructor(private readonly entradaSaidaEpiService: EntradaSaidaEpiService) {}

  @Post()
  create(@Body() createEntradaSaidaEpiDto: CreateEntradaSaidaEpiDto[]) {
    console.log('Criando registro de entregaSaida ' + new Date());
    return this.entradaSaidaEpiService.create(createEntradaSaidaEpiDto);
  }

  @Get()
  findAll() {
    return this.entradaSaidaEpiService.findAll();
  }

  @Get(':dataInicial/:dataFinal')
  findRelatorio(
    @Param('dataInicial') dataInicial: string,
    @Param('dataFinal') dataFinal: string,
  ) {
    console.log("entrega-saida/:dataInicial/:dataFinal")
    const inicio = new Date(dataInicial)
    const fim = new Date(dataFinal)
    console.log(inicio)
    console.log(fim)
    return this.entradaSaidaEpiService.findRelatorio(inicio, fim);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entradaSaidaEpiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntradaSaidaEpiDto: UpdateEntradaSaidaEpiDto,
  ) {
    return this.entradaSaidaEpiService.update(+id, updateEntradaSaidaEpiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entradaSaidaEpiService.remove(+id);
  }
}
