import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Autetica o login
  @Post('login')
  async login(@Body() body: { login: string; senha: string }) {
    const { login, senha } = body;
    return this.usuarioService.autenticar(login, senha);
  }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.alunosService.findOne(id);
  // }

  @Get(':login')
  async findOne(@Param('login') login: string) {
    return await this.usuarioService.findOneByLogin(login);
  }

  @Patch(':login')
  async atualizarUsuario(
    @Param('login') login: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.updatePorLogin(login, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}
