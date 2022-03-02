class NegociacaoService
{
    constructor()
    {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana()
    {
        return this._http
            .get("negociacoes/semana")
            .then(
                dados => 
                {
                    const negociacoes = dados.map((negociacao) => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor));
                    
                    return negociacoes;
                },
                err => 
                {
                    throw new Error("Não foi possível obter as Negociações dessa semana");
                });
    }

    obterNegociacoesDaSemanaAnterior()
    {
        return this._http
            .get("negociacoes/anterior")
            .then(
                dados => 
                {
                    const negociacoes = dados.map((negociacao) => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor));
                    
                    return negociacoes;
                },
                err => 
                {
                    throw new Error("Não foi possível obter as Negociações da semana anterior");
                });
    }

    obterNegociacoesDaSemanaRetrasada()
    {
        return this._http
            .get("negociacoes/retrasada")
            .then(
                dados => 
                {
                    const negociacoes = dados.map((negociacao) => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor));
                    
                    return negociacoes;
                },
                err => 
                {
                    throw new Error("Não foi possível obter as Negociações da semana anterior");
                });
    }

    obterNegociacoesDoPeriodo()
    {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada(),
        ])
        .then(periodo => 
            {
                return periodo.reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a, b) => b.data.getTime() - a.data.getTime());
            })
        .catch(err => 
            {
                throw new Error("Não foi possível obter as negociações do período");
            });
    }
}