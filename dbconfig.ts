export default function dbConfig(){
    const config = {
        host:'localhost',
        user:'root',
        password:'fatec',
        database:'Meteorological_Data_Collector',
        port: 3306,
        connectTimeout: 10000
    }
    return config;
}