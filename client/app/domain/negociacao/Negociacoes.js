class Negociacoes 
{
    constructor()
    {
        this._negociacoes = [];
    }

    adiciona(negociacao)
    {
        this._negociacoes.push(negociacao);
    }

    paraArray()
    {
        return [].concat(this._negociacoes);
    }

    get	volumeTotal()
    {
        return this._negociacoes
            .reduce(function (total, negociacao)
            {
                return total + negociacao.volume;
            }, 0);
    }

    esvazia()
    {
        this._negociacoes = [];
    }

    equals(negociacao) {

        return JSON.stringify(this) == JSON.stringify(negociacao);
    }  
}