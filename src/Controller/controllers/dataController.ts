import { Response, Request } from "express";
import { listarDado, buscarDado, cadastrarDado, atualizarDado, deletarDado } from "../services/dataService";

export const listarDados = async (req: Request, res: Response) =>{
    try{
        const dados = await listarDado();
        res.status(200).json(dados)
    }
    catch(error){
        res.status(500).send("Erro ao listar dados.")
        console.error(error);
    }
}

export const buscarDados = async (req: Request, res: Response) =>{
    const cod_dados = parseInt(req.params.cod_dados)
    try{
        const dado = await buscarDado(cod_dados);
        if(!dado){
            return res.status(404).send("Dado desejado não encontrado.");
        }
        res.status(302).json(dado);

    }
    catch(error){
        res.status(500).send("Erro ao encontrar dado desejado.");
        console.error(error);
    }
}

export const cadastrarDados = async (req: Request, res: Response) =>{
    const {cod_parametro, valor, unixtime} = req.body;
    try{
        await cadastrarDado(cod_parametro, valor, unixtime);
        res.status(201).send("Dado cadastrado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao cadastrar dado.")
        console.error(error);
    }
}

export const atualizarDados = async (req: Request, res: Response) =>{
    const cod_dados = parseInt(req.params.cod_dados);
    const {cod_parametro, valor, unixtime} = req.body;
    try{

        const dado = buscarDado(cod_dados);
        if(!dado){
            return res.status(404).send("Dado não encontrado.")
        }

        
        await atualizarDado(cod_dados, cod_parametro, valor, unixtime);
        res.status(200).send("Dado atualizado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao atualizar dado.")
        console.error(error);
    }
}

export const deletarDados = async (req: Request, res: Response) =>{
    const cod_dados = parseInt(req.params.cod_dados);
    try{

        const dado = buscarDado(cod_dados);
        if(!dado){
            return res.status(404).send("Dado não encontrado.")
        }

        await deletarDado(cod_dados);
        res.status(200).send("Dado deletado com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao deletar dado.")
        console.error(error);
    }
}