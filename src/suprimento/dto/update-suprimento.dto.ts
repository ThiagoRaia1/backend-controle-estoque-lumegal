import { PartialType } from '@nestjs/mapped-types';
import { CreateSuprimentoDto } from './create-suprimento.dto';

export class UpdateSuprimentoDto extends PartialType(CreateSuprimentoDto) {}
