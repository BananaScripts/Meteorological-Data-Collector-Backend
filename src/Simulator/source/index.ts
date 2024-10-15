import axios from 'axios';
import * as time from 'node:timers/promises';
import * as dotenv from 'dotenv';


import payload_Estacao01 from './simuladorEstacao01';
import payload_Estacao02 from './simuladorEstacao02';
import payload_Estacao03 from './simuladorEstacao03';

dotenv.config();

const url = 'http://127.0.0.1:3080/data';

const headers = {
    'x-api-key': 'jkfndasybfdqa783hdwqa87dhaw7hda78sh612',
    'Content-Type': 'application/json'
};

const sendData_Estacoes = async () => {
    try {
        while (true) {
            payload_Estacao01.plu += 1;
            payload_Estacao01.uxt = Math.floor(Date.now() / 1000);
            payload_Estacao01.umi = Math.floor(Math.random() * (98 - 60 + 1)) + 60;
            payload_Estacao01.tem = Math.floor(Math.random() * (39 - 24 + 1)) + 24;
            payload_Estacao01.prs = Math.floor(Math.random() * (1010 - 980 + 1)) + 980;

            const responseEstacao01 = await axios.post(url, payload_Estacao01, { headers });
            console.log(responseEstacao01.data);

            await time.setTimeout(15000); // Delay de 15 segundos

            payload_Estacao02.plu += 1;
            payload_Estacao02.uxt = Math.floor(Date.now() / 1000);
            payload_Estacao02.umi = Math.floor(Math.random() * (98 - 60 + 1)) + 60;
            payload_Estacao02.tem = Math.floor(Math.random() * (39 - 24 + 1)) + 24;
            payload_Estacao02.win = Math.floor(Math.random() * (15 - 5 + 1)) + 5;

            const responseEstacao02 = await axios.post(url, payload_Estacao02, { headers });
            console.log(responseEstacao02.data);

            await time.setTimeout(20000); // Delay de 5 segundos
        
            payload_Estacao03.plu += 1;
            payload_Estacao03.uxt = Math.floor(Date.now() / 1000);
            payload_Estacao03.umi = Math.floor(Math.random() * (98 - 60 + 1)) + 60;
            payload_Estacao03.tem = Math.floor(Math.random() * (39 - 24 + 1)) + 24;
            payload_Estacao03.slr = Math.floor(Math.random() * (900 - 300 + 1)) + 300;

            const responseEstacao03 = await axios.post(url, payload_Estacao03, { headers });
            console.log(responseEstacao03.data);

            await time.setTimeout(15000); // Delay de 5 segundos
        };

    } catch (error) {
        console.error('Error sending data:', error);
    };
};


export { sendData_Estacoes }