const { toBase64 } = require("../utils/file");

async function tratarImagens(dados) {
    if (!dados || !dados.configuracoes) return dados;

    if (dados.configuracoes.tipoImagemLogo === 'local' && dados.empresa?.logoPdf) {
        dados.empresa.logoPdf = await toBase64(dados.empresa.logoPdf);
    }

    if (dados.configuracoes.tipoImagemProduto === 'local' && Array.isArray(dados.itens)) {
        for (const item of dados.itens) {
            if (item.imagem) {
                item.imagem = await toBase64(item.imagem);
            }

            if(dados.configuracoes.expandirImagemReferencia){ //faz rowspan na td da imagem pra gerir melhor o espaçamento
                let totalLinhas = 1;
                for (const cor of item.cores) {
                    totalLinhas += cor.precos.length;
                }

                item.rowspan = totalLinhas;
            }

        }
    }

    return dados;
}

module.exports = {
    tratarImagens
};