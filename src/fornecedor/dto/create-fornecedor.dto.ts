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

  @IsNumber()
  @IsNotEmpty({ message: 'A categoria do fornecedor é obrigatória' })
  categoriaFornecedorId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  epis?: number[];
}
