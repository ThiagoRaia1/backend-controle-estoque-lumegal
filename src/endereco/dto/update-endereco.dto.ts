import { PartialType } from '@nestjs/mapped-types';
import { CreateEnderecoDto } from './create-endereco.dto';
import { IsString } from 'class-validator';

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {
  @IsString()
  cidade: string;
}
