import { Request, Response } from "express";
import { listarHistAlarme, buscarHistAlarme, cadastrarHistAlarme, atualizarHistAlarme, deletarHistAlarme } from "../services/alarmHistory";

export const listarHistAlarmes = async(req: Request, res:Response) =>{
    try{
        const hAlarmes = await listarHistAlarme();
        res.status(200).json(hAlarmes)
    }
    catch(error){
        res.status(500).send("Erro ao listar histórico de alarmes.")
        console.error(error);
    }
}
export const buscarHistAlarmes = async (req: Request, res: Response): Promise<Response> => {
    const cod_historicoAlarme = Number(req.params.cod_historicoAlarme);

    if (isNaN(cod_historicoAlarme)) {
        return res.status(400).send("Código do histórico de alarme inválido.");
    }

    try {
        const hAlarme = await buscarHistAlarme(cod_historicoAlarme);

        if (!hAlarme) {
            return res.status(404).send("Histórico de alarme não encontrado.");
        }

        return res.status(200).json(hAlarme);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erro ao buscar histórico de alarme.");
    }
};

export const cadastrarHistAlarmes = async(req: Request, res:Response) =>{
    const {valor, unixtime, cod_alarme} = req.body;
    try{
        await cadastrarHistAlarme(valor, unixtime, cod_alarme);
        res.status(201).send("Histórico de alarme cadastrado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao cadastrar histórico de alarmes.")
        console.error(error);
    }
}


export const atualizarHistAlarmes = async(req: Request, res:Response) =>{
    const cod_historicoAlarme = parseInt(req.params.cod_historicoAlarme);
    const {valor, unixtime, cod_alarme} = req.body;
    try{
        const hAlarme = buscarHistAlarme(cod_historicoAlarme);
        if(!hAlarme){
            return res.status(404).send("Histórico de alarme não encontrado.")
        }
        await atualizarHistAlarme(cod_historicoAlarme, valor, unixtime, cod_alarme)
        res.status(200).send("Histórico de alarme atualizado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao atualizar histórico de alarmes.")
        console.error(error);
    }
}

export const deletarHistAlarmes = async (req: Request, res: Response): Promise<Response> => {
    const cod_historicoAlarme = Number(req.params.cod_historicoAlarme);

    // Verifica se o código é válido
    if (isNaN(cod_historicoAlarme)) {
        return res.status(400).send("Código do histórico de alarme inválido.");
    }

    try {
        // Busca o histórico de alarme
        const hAlarme = await buscarHistAlarme(cod_historicoAlarme);

        if (!hAlarme) {
            return res.status(404).send("Histórico de alarme não encontrado.");
        }

        // Deleta o histórico de alarme
        await deletarHistAlarme(cod_historicoAlarme);

        return res.status(200).send("Histórico de alarme deletado com sucesso.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erro ao deletar histórico de alarmes.");
    }
};