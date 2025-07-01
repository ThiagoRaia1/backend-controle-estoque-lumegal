import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaFornecedorDto } from './create-categoria-fornecedor.dto';
import { IsString } from 'class-validator';

export class UpdateCategoriaFornecedorDto extends PartialType(CreateCategoriaFornecedorDto) {
  @IsString()
  nome: string;
}
