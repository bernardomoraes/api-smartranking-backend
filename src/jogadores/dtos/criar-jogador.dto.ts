import { isEmail, isNotEmpty } from 'class-validator'

export class CriarJogadorDto {
    
    @isNotEmpty()
    readonly telefoneCelular: string;
    
    @isEmail()
    readonly email: string;
    
    
    readonly nome: string;
}

// Aqui essa classe vai possuir apenas os atributos que o cliente precisa nos mandar no contexto de criação, ou seja, ele vai ter menos atributos que a nossa interface

// vamos usar esse objeto  para trafegar em toda a nossa apllicação