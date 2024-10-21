
import * as dotenv from 'dotenv';
dotenv.config(); 



let payload_Estacao02 = {
    uid: 'DEF456',
    uxt: Math.floor(Date.now() / 1000),
    plu: 19, // pluviometro
    umi: 83, // umidade
    tem: 22, // temperatura
    win: 15, // velocidade do vento
    lat: -15.794039, // latitude
    lon: -47.938528, // longitude
};

export default payload_Estacao02