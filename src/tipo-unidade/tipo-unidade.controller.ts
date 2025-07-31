import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoUnidadeService } from './tipo-unidade.service';
import { CreateTipoUnidadeDto } from './dto/create-tipo-unidade.dto';
import { UpdateTipoUnidadeDto } from './dto/update-tipo-unidade.dto';

@Controller('tipo-unidade')
export class TipoUnidadeController {
  constructor(private readonly tipoUnidadeService: TipoUnidadeService) {}

  @Post()
  create(@Body() createTipoUnidadeDto: CreateTipoUnidadeDto) {
    return this.tipoUnidadeService.create(createTipoUnidadeDto);
  }

  @Get()
  findAll() {
    return this.tipoUnidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoUnidadeService.findOne(+id);
  }

  @Get('tipo/:tipo')
  findOnePorTipo(@Param('tipo') tipo: string) {
    return this.tipoUnidadeService.findOnePorTipo(tipo);
  }

  @Patch('editar/:id')
  update(
    @Param('id') id: string,
    @Body() updateTipoUnidadeDto: UpdateTipoUnidadeDto,
  ) {
    return this.tipoUnidadeService.update(+id, updateTipoUnidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoUnidadeService.remove(+id);
  }
}
