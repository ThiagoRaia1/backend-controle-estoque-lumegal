import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDefined,
  IsDecimal,
} from 'class-validator';

export class CreateSuprimentoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional()
  descricao: string = '';

  @IsNumber()
  @IsDefined({ message: 'Quantidade é obrigatória' })
  quantidade: number;

  @IsNumber()
  @IsDefined({ message: 'Quantidade para aviso é obrigatória' })
  quantidadeParaAviso: number;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  preco: string;

  @IsNumber()
  @IsDefined({ message: 'Tipo de unidade é obrigatório' })
  tipoUnidadeId: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  fornecedores?: number[];
}
