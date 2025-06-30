import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  senha: string;
  
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Tipo de acesso é obrigatório' })
  tipoAcesso: string;
}
