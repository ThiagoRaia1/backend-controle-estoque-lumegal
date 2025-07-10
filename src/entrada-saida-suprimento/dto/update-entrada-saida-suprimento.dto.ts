import { PartialType } from '@nestjs/mapped-types';
import { CreateEntradaSaidaSuprimentoDto } from './create-entrada-saida-suprimento.dto';

export class UpdateEntradaSaidaSuprimentoDto extends PartialType(
  CreateEntradaSaidaSuprimentoDto,
) {}
