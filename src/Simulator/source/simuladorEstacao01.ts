
import * as dotenv from 'dotenv';
dotenv.config(); 



let payload_Estacao01 = {
    uid: 'ABC123',
    uxt: Math.floor(Date.now() / 1000),
    plu: 32, // pluviometro
    umi: 75, // umidade
    tem: 28, // temperatura
    prs: 1010, // pressão
    lat: -22.970706, // latitude
    lon: -43.186213, // longitude

};

export default payload_Estacao01