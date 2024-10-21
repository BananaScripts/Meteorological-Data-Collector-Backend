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
export const buscarHistAlarmes = async(req: Request, res:Response) =>{
    const cod_historicoAlarme = parseInt(req.params.cod_historicoAlarme);
    try{
        const hAlarme = buscarHistAlarme(cod_historicoAlarme);
        if(!hAlarme){
            return res.status(404).send("Histórico de alarme não encontrado.")
        }
    }
    catch(error){
        res.status(500).send("Erro ao buscar histórico de alarme.")
        console.error(error);
    }
}

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

export const deletarHistAlarmes = async(req: Request, res:Response) =>{
    const cod_historicoAlarme = parseInt(req.params.cod_historicoAlarme);
    try{
        const hAlarme = buscarHistAlarme(cod_historicoAlarme);
        if(!hAlarme){
            return res.status(404).send("Histórico de alarme não encontrado.")
        }
        await deletarHistAlarme(cod_historicoAlarme);
        res.status(200).send("Histórico de alarme deletado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao deletar histórico de alarmes.")
        console.error(error);
    }
}