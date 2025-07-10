import { PartialType } from '@nestjs/mapped-types';
import { CreateEntradaSaidaEpiDto } from './create-entrada-saida-epi.dto';

export class UpdateEntradaSaidaEpiDto extends PartialType(
  CreateEntradaSaidaEpiDto,
) {}
