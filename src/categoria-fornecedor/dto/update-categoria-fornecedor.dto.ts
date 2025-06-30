import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaFornecedorDto } from './create-categoria-fornecedor.dto';

export class UpdateCategoriaFornecedorDto extends PartialType(CreateCategoriaFornecedorDto) {}
