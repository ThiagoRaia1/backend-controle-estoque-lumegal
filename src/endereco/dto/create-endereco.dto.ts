import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  cidade: string;
}
