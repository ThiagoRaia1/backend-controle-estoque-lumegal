import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}

  /**
   * Cria um novo endereco
   * @param createEnderecoDto - Dados do endereco a ser criado
   * @returns O endereco criado
   */
  async create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    const novoEndereco = this.enderecoRepository.create(createEnderecoDto);
    return this.enderecoRepository.save(novoEndereco);
  }

  findAll() {
    return `This action returns all endereco`;
  }

  findOne(id: number) {
    return `This action returns a #${id} endereco`;
  }

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return `This action updates a #${id} endereco`;
  }

  remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
