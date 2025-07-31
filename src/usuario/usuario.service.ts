import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './entities/usuario.entity';

import * as bcrypt from 'bcrypt';

const hashRounds = 10;

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  // Cria o usuário com hash na senha
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Criptografa a senha
    const hashedSenha = await bcrypt.hash(createUsuarioDto.senha, hashRounds);

    // Cria e salva o novo usuário
    const novoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: hashedSenha,
    });

    return this.usuarioRepository.save(novoUsuario);
  }

  findAll() {
    return this.usuarioRepository.find();
    //return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return this.usuarioRepository.findOneBy({ id });
    // return `This action returns a #${id} usuario`;
  }

  async findOneByLogin(login: string) {
    return this.usuarioRepository.findOneBy({ login });
  }

  async updatePorLogin(
    login: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Omit<Usuario, '_id' | 'senha'>> {
    const usuario = await this.usuarioRepository.findOne({
      where: { login },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado com esse e-mail');
    }

    const dadosAtualizacao = { ...updateUsuarioDto };

    if (updateUsuarioDto.senha) {
      dadosAtualizacao.senha = await bcrypt.hash(
        updateUsuarioDto.senha,
        hashRounds,
      );
    }

    await this.usuarioRepository.update(usuario.id, dadosAtualizacao);

    const usuarioAtualizado = await this.usuarioRepository.findOne({
      where: { id: usuario.id },
    });

    if (!usuarioAtualizado) {
      throw new NotFoundException(
        'Erro ao atualizar: usuário não encontrado após atualização',
      );
    }

    return usuarioAtualizado;
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    if (usuario) {
      return this.usuarioRepository.remove(usuario);
    }
    // return `This action removes a #${id} usuario`;
  }
}
