import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaFornecedorDto {
  @IsString()
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  categoria: string;
}
