import { Response, Request } from "express";
import { listarAlarme, buscarAlarme, cadastrarAlarme, atualizarAlarme, deletarAlarme } from "../services/alarmService";

export const listarAlarmes = async(req: Request, res:Response) =>{
    try{
        const alarmes = listarAlarme();
        res.status(200).json(alarmes);
    }
    catch(error){
        res.status(500).send("Erro ao listar alarmes.")
        console.error(error);
    }
}

export const buscarAlarmes = async(req: Request, res:Response) =>{
    const cod_alarme = parseInt(req.params.cod_alarme)
    try{
        const alarme = buscarAlarme(cod_alarme);
        if(!alarme){
            return res.status(404).send("Alarme não encontrado.")
        }
        res.status(302).json(alarme);
    }
    catch(error){
        res.status(500).send("Erro ao buscar alarmes.")
        console.error(error);
    }
}

export const cadastrarAlarmes = async(req: Request, res:Response) =>{
    const {nome, valor, condicao, cod_parametro} = req.body;
    try{
        await cadastrarAlarme(nome, valor, condicao, cod_parametro);
        res.status(201).send("Alarme cadastrado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao cadastrar alarme.")
        console.error(error);
    }
}

export const atualizarAlarmes = async(req: Request, res:Response) =>{
    const cod_alarme = parseInt(req.params.cod_alarme);
    const {nome, valor, condicao, cod_parametro} = req.body;
    try{
        const alarme = buscarAlarme(cod_alarme);
        if(!alarme){
            return res.status(404).send("Alarme não encontrado.")
        }
        await atualizarAlarme(cod_alarme, nome, valor, condicao, cod_parametro)
        res.status(200).send("Alarme atualizado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao atualizar alarme.")
        console.error(error);
    }
}

export const deletarAlarmes = async(req: Request, res:Response) =>{
    const cod_alarme = parseInt(req.params.cod_alarme);
    try{
        const alarme = buscarAlarme(cod_alarme);
        if(!alarme){
            return res.status(404).send("Alarme não encontrado.")
        }

        await deletarAlarme(cod_alarme);
        res.status(200).send("Alarme deletado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao deletar alarme.")
        console.error(error);
    }
}