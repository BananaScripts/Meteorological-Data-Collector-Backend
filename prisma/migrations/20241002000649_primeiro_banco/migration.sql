-- CreateTable
CREATE TABLE "Usuario" (
    "cod_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Estacao" (
    "cod_estacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "macAdress" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "cep" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Parametro" (
    "cod_parametro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cod_estacao" INTEGER NOT NULL,
    "cod_tipoParametro" INTEGER NOT NULL,
    CONSTRAINT "Parametro_cod_estacao_fkey" FOREIGN KEY ("cod_estacao") REFERENCES "Estacao" ("cod_estacao") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Parametro_cod_tipoParametro_fkey" FOREIGN KEY ("cod_tipoParametro") REFERENCES "TipoParametro" ("cod_tipoParametro") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TipoParametro" (
    "cod_tipoParametro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "fator" TEXT NOT NULL,
    "offset" TEXT NOT NULL,
    "unidadeMedida" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dados" (
    "cod_dados" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cod_parametro" INTEGER NOT NULL,
    CONSTRAINT "Dados_cod_parametro_fkey" FOREIGN KEY ("cod_parametro") REFERENCES "Parametro" ("cod_parametro") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alarmes" (
    "cod_alarme" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "condicao" TEXT NOT NULL,
    "cod_parametro" INTEGER NOT NULL,
    CONSTRAINT "Alarmes_cod_parametro_fkey" FOREIGN KEY ("cod_parametro") REFERENCES "Parametro" ("cod_parametro") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistoricoAlarme" (
    "cod_historicoAlarme" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "cod_alarmes" INTEGER NOT NULL,
    "cod_alarme" INTEGER NOT NULL,
    CONSTRAINT "HistoricoAlarme_cod_alarme_fkey" FOREIGN KEY ("cod_alarme") REFERENCES "Alarmes" ("cod_alarme") ON DELETE RESTRICT ON UPDATE CASCADE
);
