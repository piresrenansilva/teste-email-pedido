const express = require('express');
const puppeteer = require('puppeteer');
const registrarHelpers = require('./helpers/handlebars');
const { tratarImagens } = require('./services/imagemService');
const gerarPdf = require('./services/pdfService');

const app = express();

app.use(express.json({limit: '50mb'}));

registrarHelpers();

let browser;

app.post('/pdf', async (req, res) => {
    try {
        let dados = req.body;

        dados = await tratarImagens(dados);

        const pdf = await gerarPdf(dados, browser);

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao gerar PDF');
    }
});

const PORT = process.env.API_PORT || 3001;

async function iniciar() {
    browser = await puppeteer.launch({
        headless: true
    });

    app.listen(PORT, () => {
        console.log(`PDF API rodando na porta ${PORT}`);
    });
}

iniciar();