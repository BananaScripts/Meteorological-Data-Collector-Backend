import { Response, Request } from "express";
import { listarParametro, buscarParametro, cadastrarParametro, atualizarParametro, deletarParametro } from "../services/param";


export const listarParametros = async(req: Request, res: Response) =>{
    try{
        const parametros = await listarParametro();
        res.status(200).json(parametros)
    }
    catch(error){
        res.status(500).send("Erro ao cadastar parâmetro.")
        console.error(error);
    }
}

export const buscarParametros = async(req: Request, res: Response) =>{
    const cod_parametro = parseInt(req.params.cod_parametro)
    try{
        const parametro = await buscarParametro(cod_parametro);
        if(!parametro){
            return res.status(404).send("Parâmetro não encontrado.")
        }
        res.status(302).json(parametro);
    }
    catch(error){
        res.status(500).send("Erro ao encontrar parâmetro.")
        console.error(error);
    }
}

export const cadastrarParametros = async(req: Request, res: Response) =>{
    const {cod_estacao, cod_tipoParametro} = req.body
    try{
        await cadastrarParametro(cod_estacao, cod_tipoParametro);
        res.status(201).send("Parâmetro cadastrado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao cadastar parâmetro.")
        console.error(error);
    }
}

export const atualizarParametros = async(req: Request, res: Response) =>{
    const cod_parametro = parseInt(req.params.cod_parametro);
    const {cod_estacao, cod_tipoParametro} = req.body;
    try{
        const parametro = await buscarParametro(cod_parametro);
        if(!parametro){
            return res.status(404).send("Parâmetro não encontrado.")
        }

        await atualizarParametro(cod_parametro, cod_estacao, cod_tipoParametro);
        res.status(200).send("Parâmetro atualizado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao deletar parâmetro")
        console.error(error);
    }
}

export const deletarParametros = async(req: Request, res: Response) =>{
    const cod_parametro = parseInt(req.params.cod_parametro);
    try{
        const parametro = await buscarParametro(cod_parametro);
        if(!parametro){
            return res.status(404).send("Parâmetro não encontrado.")
        }

        await deletarParametro(cod_parametro);
        res.status(200).send("Parâmetro deletado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao deletar parâmetro.")
        console.error(error);
    }
}