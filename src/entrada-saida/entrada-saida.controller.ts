import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntradaSaidaService } from './entrada-saida.service';
import { CreateEntradaSaidaDto } from './dto/create-entrada-saida.dto';
import { UpdateEntradaSaidaDto } from './dto/update-entrada-saida.dto';

@Controller('entrada-saida')
export class EntradaSaidaController {
  constructor(private readonly entradaSaidaService: EntradaSaidaService) {}

  @Post()
  create(@Body() createEntradaSaidaDto: CreateEntradaSaidaDto[]) {
    console.log('Criando registro de entregaSaida ' + new Date());
    return this.entradaSaidaService.create(createEntradaSaidaDto);
  }

  @Get()
  findAll() {
    return this.entradaSaidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entradaSaidaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntradaSaidaDto: UpdateEntradaSaidaDto,
  ) {
    return this.entradaSaidaService.update(+id, updateEntradaSaidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entradaSaidaService.remove(+id);
  }
}
