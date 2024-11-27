import { Response, Request } from "express";
import { listarAlarme, buscarAlarme, cadastrarAlarme, atualizarAlarme, deletarAlarme, monitorarDados } from "../services/alarmService";
import { buscarParametro, listarParametro } from "../services/param";
import { buscarTipoParametro } from "../services/paramType";
import { Parametro } from "@prisma/client";
import { buscarEstacao } from "../services/stationService";

export const listarAlarmes = async(req: Request, res:Response) =>{
    try{
        const alarmes = await listarAlarme();
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
        const alarme = await buscarAlarme(cod_alarme);
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
        const alarme = await buscarAlarme(cod_alarme);
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
        const alarme = await buscarAlarme(cod_alarme);
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

export const monitorar = async (req: Request, res: Response): Promise<Response> => {
    const { cod_alarme, tempo, tipoTempo } = req.body;

    const alarme = await buscarAlarme(cod_alarme);
    if (!alarme) {
        return res.status(404).send("Alarme não encontrado.");
    }

    if (tipoTempo !== 'Hora' && tipoTempo !== 'Minuto') {
        return res.status(400).send("Tipo de tempo inválido. Deve ser 'Hora' ou 'Minuto'.");
    }

    try {
        await monitorarDados(cod_alarme, tempo, tipoTempo);
        return res.status(200).send("Monitoramento iniciado com sucesso.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erro ao iniciar monitoramento.");
    }
};