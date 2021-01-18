import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import {JogadoresService} from './jogadores.service'
import {Jogador} from './interfaces/jogador.interface'
import { promises } from 'fs';

@Controller('api/v1/jogadores')
export class JogadoresController {

    /* 
        JogadoresController declara uma depêndencia do token JogadoresService com a injeção de dependência baseada no construtor
        Como o service já foi criado e declarado no module, podemos executar a injeção de dependência.
    */
    constructor(private readonly jogadoresService: JogadoresService) {} // Essa é a injeção de dependência!!
    // Agora podemos fazer uso desse objeto e dos seus métodos.


    @Post()
    @UsePipes(ValidationPipe)
    async criarAtualizarJogador(
        @Body() CriarJogadorDto: CriarJogadorDto) {
        /* const { email } = CriarJogadorDto
        return JSON.stringify(`{
            "email": ${email}
        }`) */

        // jogadoresService é um singleton
        await this.jogadoresService.criarAtualizarJogador(CriarJogadorDto)
    }

    @Get()
    async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
        if (email) {
            return await this.jogadoresService.consultarJogadorPeloEmail(email);
        } else {
            return await this.jogadoresService.consultarTodosJogadores()
        }
    }

    @Delete()
    async deletarJogador(@Query('email') email: string): Promise<void> {
        this.jogadoresService.deletarJogador(email)
    }
}
