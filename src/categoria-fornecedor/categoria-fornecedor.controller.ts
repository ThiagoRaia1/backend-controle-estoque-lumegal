import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriaFornecedorService } from './categoria-fornecedor.service';
import { CreateCategoriaFornecedorDto } from './dto/create-categoria-fornecedor.dto';
import { UpdateCategoriaFornecedorDto } from './dto/update-categoria-fornecedor.dto';

@Controller('categoria-fornecedor')
export class CategoriaFornecedorController {
  constructor(
    private readonly categoriaFornecedorService: CategoriaFornecedorService,
  ) {}

  @Post()
  create(@Body() createCategoriaFornecedorDto: CreateCategoriaFornecedorDto) {
    return this.categoriaFornecedorService.create(createCategoriaFornecedorDto);
  }

  @Get()
  findAll() {
    return this.categoriaFornecedorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaFornecedorService.findOne(+id);
  }

  @Get('categoria/:categoria')
  findOnePorCategoria(@Param('categoria') categoria: string) {
    return this.categoriaFornecedorService.findOnePorCategoria(categoria);
  }

  @Patch('editar/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaFornecedorDto: UpdateCategoriaFornecedorDto,
  ) {
    return this.categoriaFornecedorService.update(
      +id,
      updateCategoriaFornecedorDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaFornecedorService.remove(+id);
  }
}
