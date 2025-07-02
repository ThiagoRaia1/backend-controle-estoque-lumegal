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
    return this.epiService.create(createEpiDto);
  }

  @Get()
  findAll() {
    return this.epiService.findAll();
  }

  @Get('emFalta')
  findAllEmFalta() {
    return this.epiService.findAllEmFalta();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.epiService.findOne(id);
  }

  @Patch(':nomeParaEditarEpi')
  update(
    @Body() updateEpiDto: UpdateEpiDto,
    @Param('nomeParaEditarEpi') nomeParaEditarEpi: string,
  ) {
    return this.epiService.update(nomeParaEditarEpi, updateEpiDto);
  }

  @Patch('entradaSaida')
  entradaSaida(
    @Body()
    movimentacoes: UpdateQuantidadeEpi[],
  ) {
    return this.epiService.entradaSaidaEpi(movimentacoes);
  }

  @Delete('excluir/:id')
  async excluir(@Param('id') id: number) {
    return this.epiService.remove(id);
  }
}
