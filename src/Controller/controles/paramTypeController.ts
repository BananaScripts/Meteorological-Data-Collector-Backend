import { Response, Request } from "express";
import { listarTipoParametro, buscarTipoParametro, cadastrarTipoParametro, atualizarTipoParametro, deletarTipoParametro } from "../services/paramType";
import { json } from "body-parser";

export const listarTiposParametros = async(req: Request, res: Response) =>{
    try{
        const tipoParametros = await listarTipoParametro();
        res.status(200).json(tipoParametros)
    }
    catch(error){
        res.status(500).send("Erro ao cadastar tipo de parâmetro.")
        console.error(error);
    }
}

export const buscarTiposParametros = async(req: Request, res: Response) =>{
    const cod_tipoParametro = parseInt(req.params.cod_tipoParametro)
    try{
        const tipoParametro = await buscarTipoParametro(cod_tipoParametro);
        if(!tipoParametro){
            return res.status(404).send("Tipo de parâmetro não encontrado.")
        }
        res.status(302).json(tipoParametro);
    }
    catch(error){
        res.status(500).send("Erro ao encontrar tipo de parâmetro.")
        console.error(error);
    }
}

export const cadastrarTiposParametros = async(req: Request, res: Response) =>{
    const {nome, fator, offset, unidadeMedida, json} = req.body
    try{
        await cadastrarTipoParametro(nome, fator, offset, unidadeMedida, json);
        res.status(201).send("Tipo de parâmetro cadastrado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao cadastar tipo de parâmetro.")
        console.error(error);
    }
}

export const atualizarTiposParametros = async(req: Request, res: Response) =>{
    const cod_tipoParametro = parseInt(req.params.cod_tipoParametro);
    const {nome, fator, offset, unidadeMedida, json} = req.body;
    try{
        const tipoParametro = await buscarTipoParametro(cod_tipoParametro);
        if(!tipoParametro){
            return res.status(404).send("Tipo de Parâmetro não encontrado.")
        }

        await atualizarTipoParametro(cod_tipoParametro, nome, fator, offset, unidadeMedida, json);
        res.status(200).send("Tipo de parâmetro atualizado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao atualizar tipo de parâmetro")
        console.error(error);
    }
}

export const deletarTiposParametros = async(req: Request, res: Response) =>{
    const cod_tipoParametro = parseInt(req.params.cod_tipoParametro);
    try{
        const tipoParametro = await buscarTipoParametro(cod_tipoParametro);
        if(!tipoParametro){
            return res.status(404).send("Tipo de parâmetro não encontrado.")
        }

        await deletarTipoParametro(cod_tipoParametro);
        res.status(200).send("Tipo de parâmetro deletado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao deletar tipo de parâmetro.")
        console.error(error);
    }
}