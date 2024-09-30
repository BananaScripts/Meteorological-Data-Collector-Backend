create database Meteorological_Data_Collector;
use Meteorological_Data_Collector;


create table Usuario (
	cod_usuario int primary key auto_increment,
    nome varchar(45),
    dataNascimento date,
    cpf varchar(12),
    email varchar (45),
    senha varchar (45)
);

create table Estacao (
	cod_estacao int primary key auto_increment,
    cod_usuario int,
    nome varchar(45),
    macAdress varchar(45),
    cidade varchar(45),
    estado varchar(45),
    numero varchar(45),
    cep int (12),
    foreign key (cod_usuario) references Usuario (cod_usuario)
);

create table TipoParametro (
	cod_tipoParametro int primary key auto_increment,
    cod_usuario int,
    nome varchar (45),
    fator varchar (45),
    offset float (45),
    unidadeMedida enum(
		'Celcius', 
        'Kelvin', 
        'Fahrenheit', 
        'km/h', 
        'm/s', 
        'kg/m3', 
        'g/m3', 
        'mm', 
        'ml', 
        'lux' 
	),
    foreign key (cod_usuario) references Usuario (cod_usuario)
);

create table Parametro (
	cod_parametro int primary key auto_increment,
    cod_tipoParametro int,
    cod_estacao int,
    foreign key (cod_tipoParametro) references TipoParametro (cod_tipoParametro),
    foreign key (cod_estacao) references Estacao (cod_estacao)
);

create table Dados (
	cod_dados int primary key auto_increment,
    cod_parametro int, 
    cod_estacao int,
    cod_tipoParametro int,
    data varchar(12),
    hora varchar(12),
    valor int,
    foreign key (cod_parametro) references Parametro (cod_parametro),
    foreign key (cod_estacao) references Estacao (cod_estacao),
	foreign key (cod_tipoParametro) references Parametro (cod_tipoParametro)
);

create table Alarme (
	cod_alarme int primary key auto_increment,
    nome varchar(45),
    valor int
);

create table ChangeLog (
	cod_changeLog int primary key auto_increment,
    responsavel varchar(45),
	data date,
    descricao varchar(80)
);


INSERT INTO Usuario (nome, dataNascimento, cpf, email, senha) VALUES 
('João Silva', '1985-05-20', '12345678901', 'joao@example.com', 'senha123'),
('Maria Oliveira', '1990-08-15', '10987654321', 'maria@example.com', 'senha456');


Select * from ChangeLog;
Select * from Usuario;
Select * from Parametro;
Select * from Estacao;
Select * from Alarme

