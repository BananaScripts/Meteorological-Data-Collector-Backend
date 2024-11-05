#include <WiFi.h>
#include "time.h"
#include <HTTPClient.h>
#include <esp_mac.h> 

String uid;

char *ssid = "Cell_Douglas";
char *pwd = "ursobebado";

char *ntpServer = "br.pool.ntp.org";
long gmtOffset = -3;
int daylight = 0;
time_t now;
struct tm timeinfo;

String serverName = "http://192.168.101.130:30015/SendData";

void connectWiFi()
{
  Serial.print("Conectando ");
  while(WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Conectado com sucesso, com o IP ");
  Serial.println(WiFi.localIP());
}

void setup() {
  pinMode(2, OUTPUT);
  Serial.begin(115200);
  
  // Obter e formatar o endereço MAC como String sem ":"
  uid = WiFi.macAddress();
  uid.replace(":", "");
  
  WiFi.begin(ssid, pwd);
  connectWiFi();
  
  configTime(gmtOffset, daylight, ntpServer);
  if (!getLocalTime(&timeinfo))
  {
    Serial.println("Erro ao acessar o servidor NTP"); 
  }
  else
  {
    Serial.print("A hora agora eh ");
    Serial.println(time(&now));
  }
}

float t = 12.0;
float u = 27.0;

void loop() {
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("Reconectando ao Wi-Fi...");
    connectWiFi();
    if(!getLocalTime(&timeinfo))
    {
      Serial.println("Erro ao coletar data/hora");
    }
    WiFiClient wclient;
    HTTPClient http_post;

    http_post.begin(wclient, serverName);
    http_post.addHeader("Content-Type", "application/json");    
    
    // Construa a string JSON usando o valor uid como String
    String tmp = "{\"uid\":\"" + uid + "\",\"unx\":" + String(time(&now)) + ",\"temp\":" + String(t) + ",\"umi\":" + String(u) + "}";

    int http_get_code = http_post.POST(tmp.c_str());

    Serial.println("");
    Serial.println(http_get_code);
    if (http_get_code > 0)
    {
      digitalWrite(2, HIGH);
      delay(500);
      digitalWrite(2, LOW);
      Serial.println(tmp);
      Serial.println(http_post.getString());
    }
    else
    {
      Serial.println("Erro ao executar o POST");
    }
    http_post.end();  // Termina a conexão HTTP
  }
  else 
  {
    Serial.println("Na Fatec nunca tem internet...");
    connectWiFi();
  }
  
  // Incrementos de temperatura e umidade simulados
  t = t + 0.25;
  u = u + 0.09;
  
  delay(30000);
}
