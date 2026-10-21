const sql = require("mssql");

const pool = new sql.ConnectionPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        ...(process.env.DB_INSTANCENAME && {
            instanceName: process.env.DB_INSTANCENAME
        }),
        trustServerCertificate: true
    }
}).connect();

async function execProcedure(procedure, params) {
    const conn = await pool;
    const request = conn.request();
    
    if(params){
        request.input('parametros', JSON.stringify(params));
    }    

    const result = await request.execute(procedure);

    if (!result.recordset || result.recordset.length === 0) {
        throw new Error(`Procedure ${procedure} não retornou dados`);
    }

    const jsonString = result.recordset[0].json;

    if (!jsonString) {
        return null;
    }

    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("JSON inválido:", jsonString);
        throw e;
    }
}

async function buscarPendentes() {
    return await execProcedure("sp_gmobil_adm_buscarPedidosEnvioEmail");
}

async function buscarJsonPedido(parametros) {
    return await execProcedure("sp_gmobil_adm_obterJsonPedidoEnvioEmail", parametros);
}

async function atualizarProcesso(parametros) {
    return await execProcedure("sp_gmobil_adm_atualizarPedidosEnvioEmail", parametros);
}

module.exports = {
    buscarPendentes,
    buscarJsonPedido,
    atualizarProcesso
};