
import * as dotenv from 'dotenv';
dotenv.config(); 



let payload_Estacao03 = {
    uid: 'GHI789',
    uxt: Math.floor(Date.now() / 1000),
    plu: 25, // pluviometro
    umi: 76, // umidade
    tem: 26, // temperatura
    slr: 900, // radiacao solar
    lat: -15.794039, // latitude
    lon: -47.938528, // longitude
};


export default payload_Estacao03