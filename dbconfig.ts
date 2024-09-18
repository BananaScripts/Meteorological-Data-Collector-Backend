export default function dbConfig(){
    const config = {
        host:'localhost',
        user:'root',
        password:'root',
        database:'Meteorological_Data_Collector',
        port: 3306,
        connectTimeout: 10000
    }
    return config;
}