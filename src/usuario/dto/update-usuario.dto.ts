import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import {
    IsOptional,
    IsString,
    IsEmail,
} from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsEmail()
  login?: string;

  @IsOptional()
  @IsString()
  senha?: string;
  
  @IsOptional()
  @IsString()
  nome?: string;
  
  @IsOptional()
  @IsString()
  tipoAcesso?: string;
}
