import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EpiService } from './epi.service';
import { CreateEpiDto } from './dto/create-epi.dto';
import { UpdateQuantidadeEpi } from './dto/updateQuantidadeEpi.dto';
import { UpdateEpiDto } from './dto/update-epi.dto';

@Controller('epi')
export class EpiController {
  constructor(private readonly epiService: EpiService) {}

  @Post()
  create(@Body() createEpiDto: CreateEpiDto) {
    console.log("create")
    return this.epiService.create(createEpiDto);
  }

  @Get()
  findAll() {
    console.log("findAll")
    return this.epiService.findAll();
  }

  @Get('emFalta')
  findAllEmFalta() {
    console.log("findAllEmFalta")
    return this.epiService.findAllEmFalta();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: number) {
    console.log("findOne")
    return this.epiService.findOne(id);
  }

  @Patch('editarDados/:nomeParaEditarEpi')
  update(
    @Body() updateEpiDto: UpdateEpiDto,
    @Param('nomeParaEditarEpi') nomeParaEditarEpi: string,
  ) {
    console.log("editarDados")
    return this.epiService.update(nomeParaEditarEpi, updateEpiDto);
  }

  @Patch('entradaSaida')
  entradaSaida(
    @Body()
    movimentacoes: UpdateQuantidadeEpi[],
  ) {
    console.log('Registrando movimentação ' + new Date());
    return this.epiService.entradaSaidaEpi(movimentacoes);
  }

  @Delete('excluir/:id')
  async excluir(@Param('id') id: number) {
    console.log("excluir")
    return this.epiService.remove(id);
  }
}
