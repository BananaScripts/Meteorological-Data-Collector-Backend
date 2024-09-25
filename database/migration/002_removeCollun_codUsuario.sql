use Meteorological_Data_Collector;

SHOW CREATE TABLE Estacao;
SHOW CREATE TABLE TipoParametro;
SHOW CREATE TABLE Parametro;
SHOW CREATE TABLE Dados;


ALTER TABLE Estacao 
    DROP FOREIGN KEY Estacao_ibfk_1, 
    DROP COLUMN cod_usuario;


ALTER TABLE TipoParametro 
    DROP FOREIGN KEY TipoParametro_ibfk_1, 
    DROP COLUMN cod_usuario;


ALTER TABLE Parametro 
    DROP FOREIGN KEY Parametro_ibfk_1;


ALTER TABLE Dados 
    DROP FOREIGN KEY Dados_ibfk_1, 
    DROP FOREIGN KEY Dados_ibfk_2, 
    DROP FOREIGN KEY Dados_ibfk_3;
