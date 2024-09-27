use Meteorological_Data_Collector;

INSERT INTO Usuario (nome, dataNascimento, cpf, email, senha)
VALUES ('Hudson', '1985-08-15', '12345678901', 'hudson@email.com', 'senha123');

INSERT INTO Estacao (nome, macAdress, cidade, estado, numero, cep)
VALUES ('Estação Central', '00:1A:2B:3C:4D:5E', 'São Paulo', 'SP', '100', '0123456789');

INSERT INTO TipoParametro (nome, fator, offset, unidadeMedida)
VALUES ('Temperatura', '1.0', 0.0, 'Celcius');

INSERT INTO Parametro (cod_tipoParametro, cod_estacao)
VALUES (1, 1);

INSERT INTO Dados (cod_parametro, cod_estacao, cod_tipoParametro, data, hora, valor)
VALUES (1, 1, 1, '2024-09-24', '14:30', 25);

INSERT INTO Alarme (nome, valor, condicao, cod_tipoParametro)
VALUES ('Alarme Temperatura Alta', '30', '>', 1);

INSERT INTO ChangeLog (responsavel, data, descricao)
VALUES ('Hudson', '2024-09-26', 'Descrição do changelog');