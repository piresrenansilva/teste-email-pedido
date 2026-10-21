const puppeteer = require("puppeteer");

const db = require("../config/database");
const { tratarImagens } = require('../services/imagemService');
const gerarPDF = require("../services/pdfService");
const gerarCorpoEmail = require("../services/htmlEmailService");
const enviarEmail = require("../services/emailService");

async function processarPedidos() {
    const pedidos = await db.buscarPendentes();
    
    const resultados = [];

    const browser = await puppeteer.launch();

    for (const pedido of pedidos) {
        try {
            let dados = await db.buscarJsonPedido(pedido);                        

            if(dados){
                dados = await tratarImagens(dados);
                        
                const pdf = await gerarPDF(dados, browser);
    
                const corpoEmail = await gerarCorpoEmail(dados);
    
                await enviarEmail(dados.envioEmail, corpoEmail, pdf);
    
                resultados.push({pedido: pedido, status: 'SUCESSO'});
            }

        } catch (erro) {
            console.error("Erro pedido:", pedido.pedidoGmobil, erro);

            resultados.push({pedido: pedido, status: 'ERRO', mensagem: erro.message});
        }
    }

    await browser.close();

    if(resultados.length){
        await db.atualizarProcesso(resultados);
    }
}
 

module.exports = { processarPedidos };