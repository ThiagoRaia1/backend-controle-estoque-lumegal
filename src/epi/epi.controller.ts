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
  findOne(@Param('id') id: string) {
    return this.epiService.findOne(+id);
  }

  @Patch('entradaSaida')
  entradaSaida(
    @Body()
    movimentacoes: UpdateQuantidadeEpi[],
  ) {
    return this.epiService.entradaSaidaEpi(movimentacoes);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.epiService.remove(+id);
  }
}
