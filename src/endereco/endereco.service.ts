import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.enderecoRepository.find();
    //return `This action returns all usuarios`;
  }

  async findOne(id: number): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOneBy({ id });

    if (!endereco) {
      throw new NotFoundException('Endereço não encontrado');
    }

    return endereco;
  }

  async findOnePorCidade(cidade: string): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOne({
      where: { cidade },
      relations: ['fornecedores'],
    });

    if (!endereco) {
      throw new NotFoundException('Endereço não encontrado');
    }

    return endereco;
  }

  async update(id: number, dto: UpdateEnderecoDto): Promise<Endereco> {
    const endereco = await this.findOne(id);

    endereco.cidade = dto.cidade ?? endereco.cidade;

    return this.enderecoRepository.save(endereco);
  }

  remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
