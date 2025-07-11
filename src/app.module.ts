import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { EpiModule } from './epi/epi.module';
import { TipoUnidadeModule } from './tipo-unidade/tipo-unidade.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { CategoriaFornecedorModule } from './categoria-fornecedor/categoria-fornecedor.module';
import { EnderecoModule } from './endereco/endereco.module';
import { SuprimentoModule } from './suprimento/suprimento.module';
import { EntradaSaidaSuprimentoModule } from './entrada-saida-suprimento/entrada-saida-suprimento.module';
import { EntradaSaidaEpiModule } from './entrada-saida-epi/entrada-saida-epi.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carrega as variáveis do .env automaticamente
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: true, // Não usar true em produção
      host: 'aws-0-sa-east-1.pooler.supabase.com',
      port: 6543,
      database: 'postgres',
      username: 'postgres.nnssfdbmxrxtlfunvckh',
      password: process.env.DB_PASS, // A senha do Supabase
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsuarioModule,
    EpiModule,
    EntradaSaidaEpiModule,
    TipoUnidadeModule,
    FornecedorModule,
    CategoriaFornecedorModule,
    EnderecoModule,
    SuprimentoModule,
    EntradaSaidaSuprimentoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
