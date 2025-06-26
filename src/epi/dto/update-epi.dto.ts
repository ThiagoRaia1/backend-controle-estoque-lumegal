import { PartialType } from '@nestjs/mapped-types';
import { CreateEpiDto } from './create-epi.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateEpiDto extends PartialType(CreateEpiDto) {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  certificadoAprovacao?: string;
  
  @IsOptional()
  @IsNumber()
  quantidade?: number;
  
  @IsOptional()
  @IsNumber()
  quantidadeParaAviso?: number;
  
  @IsOptional()
  @IsString()
  tipoUnidade?: string;
  
  @IsOptional()
  @IsString()
  fornecedor?: string;
}
