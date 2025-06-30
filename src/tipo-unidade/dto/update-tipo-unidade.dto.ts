import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoUnidadeDto } from './create-tipo-unidade.dto';

export class UpdateTipoUnidadeDto extends PartialType(CreateTipoUnidadeDto) {}
