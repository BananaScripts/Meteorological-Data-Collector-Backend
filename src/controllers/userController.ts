import { Request, Response } from "express";
import { listarUsuario, buscarUsuario, cadastrarUsuario, atualizarUsuario, deletarUsuario } from "../services/userService";


export const listarUsuarios = async(req: Request, res: Response) =>{
    try{
        const usuarios = await listarUsuario();
        res.status(200).json(usuarios);
    }
    catch(error){
        res.status(500).json({message: "Erro ao listar usuários."});
        console.error(error);
    }
}


export const buscarUsuarios = async(req: Request, res: Response) =>{
    const cod_usuario = parseInt(req.params.cod_usuario);
    try{
        const usuario = await buscarUsuario(cod_usuario);
        if(!usuario){
            return res.status(404).json({message: "Usuário não encontrado."});
        }
        res.json(usuario);
    }
    catch(error){
        res.status(500).json({message: "Erro ao buscar usuário."});
        console.error(error);
    }
}

export const cadastrarUsuarios = async (req: Request, res: Response) =>{
    const {nome, dataNascimento, cpf, email, senha} = req.body;
    try{
        await cadastrarUsuario(nome, dataNascimento, cpf, email, senha);
        res.status(201).json({message: "Usuário cadastrado com sucesso!"});
    }
    catch(error){
        res.status(500).json({message: "Erro ao cadastrar usuário."});
        console.log(error);
    }
}

export const atualizarUsuarios = async(req: Request, res: Response) =>{
    const cod_usuario = parseInt(req.params.cod_usuario);
    const {nome, dataNascimento, cpf, email, senha} = req.body;
    try{
        await atualizarUsuario(cod_usuario, nome, dataNascimento, cpf, email, senha);
        res.status(200).json({message: "Usuário atualizado com sucesso."});
    }
    catch(error){
        res.status(500).json({message: "Erro ao atualizar usuário"});
        console.error(error);
    }
}

export const deletarUsuarios = async (req: Request, res: Response) =>{
    const cod_usuario = parseInt(req.params.cod_usuario);
    try{
        await deletarUsuario(cod_usuario);
        res.status(200).json({message: "Usuário deletado com sucesso."});
    }
    catch(error){
        res.status(500).json({message: "Erro ao deletar usuário desejado."});
        console.error(error);
    }
}