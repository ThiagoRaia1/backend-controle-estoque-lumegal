import { PartialType } from '@nestjs/mapped-types';
import { CreateEpiDto } from './create-epi.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdateQuantidadeEpi extends PartialType(CreateEpiDto) {
  @IsString()
  _id: string;
  
  @IsNumber()
  quantidade: number;
}
