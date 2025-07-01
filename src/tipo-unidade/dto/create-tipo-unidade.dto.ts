import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoUnidadeDto {
  @IsString()
  @IsNotEmpty({ message: 'Tipo é obrigatório' })
  tipo: string;
}
