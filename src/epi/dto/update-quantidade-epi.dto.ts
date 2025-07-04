import { PartialType } from '@nestjs/mapped-types';
import { CreateEpiDto } from './create-epi.dto';
import { IsNumber } from 'class-validator';

export class UpdateQuantidadeEpiDto extends PartialType(CreateEpiDto) {
  @IsNumber()
  id: number;
  
  @IsNumber()
  quantidade: number;
}
