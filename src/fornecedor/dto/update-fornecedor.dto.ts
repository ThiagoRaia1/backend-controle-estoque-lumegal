import { PartialType } from '@nestjs/mapped-types';
import { CreateFornecedorDto } from './create-fornecedor.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateFornecedorDto extends PartialType(CreateFornecedorDto) {
  @IsString()
  nome: string;

  @IsNumber()
  categoriaFornecedor: number;
}
