import { migrarDadosMongoParaSupabase } from "./app";


    migrarDadosMongoParaSupabase()
    .catch(error => console.error("Erro ao executar a migração:", error));

