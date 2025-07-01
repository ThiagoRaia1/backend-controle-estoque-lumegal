import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateFornecedorDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'Pelo menos um endereço é obrigatório' })
  @IsNumber({}, { each: true })
  enderecos: number[];

  @IsArray()
  @ArrayNotEmpty({ message: 'Pelo menos uma categoria é obrigatória' })
  @IsNumber({}, { each: true })
  categoriasFornecedor: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  epis?: number[];
}
