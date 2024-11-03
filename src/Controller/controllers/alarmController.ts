import { Response, Request } from "express";
import { listarAlarme, buscarAlarme, cadastrarAlarme, atualizarAlarme, deletarAlarme, monitorarDados } from "../services/alarmService";
import { buscarParametro, listarParametro } from "../services/param";
import { buscarTipoParametro } from "../services/paramType";
import { Parametro } from "@prisma/client";

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

export const monitorar = async(req: Request, res:Response) =>{
    const { nome, valorAlvo, condicao, cod_tipoParametro, tempo, tipoTempo} = req.body
    try{
        let cod_parametro = 0
        const parametros:Array<Parametro> = await listarParametro()
        for(let parametro of parametros){
            if(parametro.cod_tipoParametro === cod_tipoParametro){
                cod_parametro = parametro.cod_parametro
            }
        }

        const parametroExiste = await buscarParametro(cod_parametro)
        if(!parametroExiste){
            return res.status(404).send("Parâmetro não existe")
        }
        await monitorarDados(nome, valorAlvo, condicao, cod_parametro, cod_tipoParametro, tempo, tipoTempo)
        res.status(200).send("Monitoramento iniciado!")
    }
    catch(err){
        console.error(err)
    }
}