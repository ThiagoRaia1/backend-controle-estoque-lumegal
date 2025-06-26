import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEpiDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  descricao: string = "";

  @IsString()
  certificadoAprovacao: string = "";

  @IsNumber()
  @IsDefined({ message: 'Quantidade é obrigatória' })
  quantidade: number;

  @IsNumber()
  @IsDefined({ message: 'Quantidade para aviso é obrigatória' })
  quantidadeParaAviso: number;

  @IsString()
  @IsNotEmpty({ message: 'Tipo de unidade é obrigatório' })
  tipoUnidade: string;

  @IsString()
  fornecedor: string = "";
}
