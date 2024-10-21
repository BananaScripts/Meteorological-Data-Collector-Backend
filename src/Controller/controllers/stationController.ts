import { listarEstacao, buscarEstacao, cadastrarEstacao, atualizarEstacao, deletarEstacao } from "../services/stationService";
import { Response, Request } from "express";


export const listarEstacoes = async(req: Request, res: Response) =>{
    try{
        const estacoes = await listarEstacao();
        res.status(200).json(estacoes);
    }
    catch(error){
        res.status(500).send("Erro ao listar estações.")
        console.error(error);
    }
}

export const buscarEstacoes = async(req: Request, res: Response) =>{
    const cod_estacao = parseInt(req.params.cod_estacao);
    try{
        const estacao = await buscarEstacao(cod_estacao);
        if(!estacao){
            return res.status(404).send("Estação desejada não foi encontrada.")
        }
        res.status(302).json(estacao);
    }
    catch(error){
        res.status(500).send("Erro ao buscar estação.")
        console.error(error);
    }
}

export const cadastrarEstacoes = async(req: Request, res: Response) =>{
    const {macAdress, nome, cidade, estado, numero, cep} = req.body;
    try{
        await cadastrarEstacao(macAdress, nome, cidade, estado, numero, cep);
        res.status(201).send("Estação cadastrada com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao cadastrar estação.")
        console.error(error);
    }
}

export const atualizarEstacoes = async(req: Request, res: Response) =>{
    const cod_estacao = parseInt(req.params.cod_estacao);
    const {macAdress, nome, cidade, estado, numero, cep} = req.body;
    try{
        const estacao = await buscarEstacao(cod_estacao);
        if(!estacao){
            return res.status(404).send("Estação não encontrada.")
        }

        await atualizarEstacao(cod_estacao, macAdress, nome, cidade, estado, numero, cep )
        res.status(200).send("Estação atualizada com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao atualizar estação.")
        console.error(error);
    }
}

export const deletarEstacoes = async(req: Request, res: Response) =>{
    const cod_estacao = parseInt(req.params.cod_estacao);
    try{
        const estacao = await buscarEstacao(cod_estacao);
        if(!estacao){
            return res.status(404).send("Estação não encontrada.")
        }

        await deletarEstacao(cod_estacao)
        res.status(200).send("Estação deletada com sucesso.")
    }
    catch(error){
        res.status(500).send("Erro ao deletar estação.")
        console.error(error);
    }
}

