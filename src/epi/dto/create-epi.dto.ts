import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEpiDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional()
  descricao: string = '';

  @IsString()
  @IsOptional()
  certificadoAprovacao: string = '';

  @IsNumber()
  @IsDefined({ message: 'Quantidade é obrigatória' })
  quantidade: number;

  @IsNumber()
  @IsDefined({ message: 'Quantidade para aviso é obrigatória' })
  quantidadeParaAviso: number;

  @IsNumber()
  @IsDefined({ message: 'ID do tipo de unidade é obrigatório' })
  tipoUnidadeId: number;

  @IsOptional()
  @IsNumber({}, { each: true }) // se quiser aceitar vários fornecedores
  fornecedores?: number[];
}
