import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ping do backend Controle de Estoque Lumegal';
  }
}
