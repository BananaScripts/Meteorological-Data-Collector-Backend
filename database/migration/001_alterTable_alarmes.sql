use Meteorological_Data_Collector;

ALTER TABLE Alarme 
    MODIFY cod_alarme INT,
    ADD cod_tipoParametro INT,
    MODIFY nome VARCHAR(45),
    MODIFY valor VARCHAR(45),
    ADD condicao VARCHAR(45);

ALTER TABLE Alarme 
    ADD CONSTRAINT fk_cod_tipoParametro
    FOREIGN KEY (cod_tipoParametro) REFERENCES TipoParametro(cod_tipoParametro);

    