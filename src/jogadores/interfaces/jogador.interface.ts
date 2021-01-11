export interface Jogador {
    readonly _id: string;
    readonly telefoneCelular: string;
    readonly email: string;
    nome: string;
    ranking: string;
    posicaoRanking: number;
    urlFotoJogador: string;
}

// Temos alguns dados que o front não vai mandar para nós, como por exemplo a posição do Ranking ou o ID...
// por essa razão vamos trabalhar com DTO (data transfer object) que é um desing pattern.