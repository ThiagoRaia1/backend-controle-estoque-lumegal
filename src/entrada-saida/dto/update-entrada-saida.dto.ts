import { PartialType } from '@nestjs/mapped-types';
import { CreateEntradaSaidaDto } from './create-entrada-saida.dto';

export class UpdateEntradaSaidaDto extends PartialType(CreateEntradaSaidaDto) {}
