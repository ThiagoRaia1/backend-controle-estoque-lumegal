import { PartialType } from '@nestjs/mapped-types';
import { CreateSuprimentoDto } from './create-suprimento.dto';
import { IsNumber } from 'class-validator';

export class UpdateQuantidadeSuprimentoDto extends PartialType(
  CreateSuprimentoDto,
) {
  @IsNumber()
  id: number;

  @IsNumber()
  quantidade: number;
}
