const negociacaoController = new NegociacaoController();

const $ = document.querySelector.bind(document);

$(".form")
    .addEventListener("submit", negociacaoController.adiciona.bind(negociacaoController));

$("#btn-apagar")
    .addEventListener("click", negociacaoController.apaga.bind(negociacaoController));

$("#btn-importa")
    .addEventListener("click", negociacaoController.importaNegociacoes.bind(negociacaoController));