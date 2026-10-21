const Handlebars = require('handlebars');

function registrarHelpers() {
    Handlebars.registerHelper('linhaPar', function (index) {
        return (index + 1) % 2 === 0;
    });

    Handlebars.registerHelper('formatarNumerico', function (valor) {
        if (valor === null || valor === undefined) {
            return '';
        }

        const numero = Number(valor);

        if (isNaN(numero)) {
            return '';
        }
        return numero.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    });

    Handlebars.registerHelper('exibirColunaImgCor', function (exibirImagemProduto, expandirImagemReferencia) {
        return exibirImagemProduto && !expandirImagemReferencia;
    });

    Handlebars.registerHelper('aplicarMargemBottomUltimaRef', function (ultima, expandirImagemReferencia) {
        return ultima && expandirImagemReferencia;
    });
}

module.exports = registrarHelpers;