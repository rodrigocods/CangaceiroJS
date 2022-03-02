class NegociacaoController 
{
    constructor() 
    {
        const $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._service = new NegociacaoService();

        this._negociacoes = new Bind
        (
            new Negociacoes(),
            new NegociacoesView("#negociacoes"),
            'adiciona', 'esvazia'
        );

        this._mensagem = new Bind
        (
            new Mensagem(),
            new MensagemView("#mensagem"),
            'texto'
        );
    }

    adiciona(event)
    {
        event.preventDefault();
        this._negociacoes.adiciona(this._criarNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
    }

    _limpaFormulario()
    {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }

    _criarNegociacao()
    {
        return new Negociacao
        (
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    apaga()
    {
        this._negociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }

    importaNegociacoes()
    {
        this._service
            .obterNegociacoesDoPeriodo()
            .then(negociacoes => 
                {
                    negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                    this._mensagem.texto = "Negociações do período importadas com sucesso";
                })
            .catch(err => this._mensagem.texto = err);
    }
}