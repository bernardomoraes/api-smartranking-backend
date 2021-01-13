import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid' 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/* 
    O decorator @injectable declara a classe JogadoresServices como uma classe que pode ser gerenciada pelo Nest IoC Container
*/
@Injectable() // Isto tornou a classe JogadoresService um Provider!
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}
    
    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = criaJogadorDto

        // const jogadorEncontrado =  await this.jogadores.find(jogador => jogador.email === email)
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec(); //como o nome da variável e o nome do campo no banco de dados, só precisamos passar o nome.

        if (jogadorEncontrado) {
            await this.atualizar(criaJogadorDto)
        } else {
             await this.criar(criaJogadorDto)
        };
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        // return await this.jogadores;
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPeloEmail(email:string): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()
        // const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
        }

        return jogadorEncontrado
    }

    async deletarJogador (email) : Promise<any> {
        return await this.jogadorModel.remove({email}).exec()
        
        /* const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email) */
    }

    private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(criaJogadorDto)

        return await jogadorCriado.save()


        /* const {nome, telefoneCelular, email } = criaJogadorDto

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        };
        this.jogadores.push(jogador);
        console.log(this.jogadores) */
    }
    
    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec();
        
        /* const { nome } = CriarJogadorDto

        jogadorEncontrado.nome = nome; */

    }
}
