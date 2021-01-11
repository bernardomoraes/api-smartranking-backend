import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid' 

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];
    
    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {

        this.logger.log(`criaJogadorDto: ${criaJogadorDto}`)



    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const {nome, telefoneCelular, email } = criaJogadorDto

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            

        }
        
    }
}
