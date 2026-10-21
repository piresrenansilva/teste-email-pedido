require("dotenv").config();
const cron = require('node-cron');
const { processarPedidos } = require("./jobs/processarPedidos");

const registrarHelpers = require('./helpers/handlebars');

registrarHelpers();

let executando = false;

const CRON = process.env.CRON_INTERVALO || "*/1 * * * *";

cron.schedule(CRON, async () => {
    if (executando) {
        console.log("Job ainda em execução, ignorando...");
        return;
    }

    executando = true;

    try {
        console.log("Iniciando processamento...");
        await processarPedidos();
        console.log("Finalizado");
    } catch (e) {
        console.error("Erro:", e);
    } finally {
        executando = false;
    }
});
