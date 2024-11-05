#include <WiFi.h>
#include "time.h"
#include <HTTPClient.h>
#include <esp_mac.h> 


char uid[13];

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
  

  WiFi.begin(ssid, pwd);
  connectWiFi();


  uint8_t mac[6];
  esp_read_mac(mac, ESP_MAC_WIFI_STA);
  snprintf(uid, sizeof(uid), "%02X%02X%02X%02X%02X%02X", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);


  
  configTime(gmtOffset, daylight, ntpServer);
  if (!getLocalTime(&timeinfo))
  {
    Serial.println("Erro ao acessar o servidor NTP"); 
  }
}

float t = 12.0;
float u = 27.0;
float p = 32.0;


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

    String tmp = "{\"uid\":\"" + String(uid) + "\",\"unx\":" + String(time(&now)) + ",\"temp\":" + String(t) + ",\"umi\":" + String(u) + ",\"plu\":" + String(p) + "}";

    Serial.println(tmp.c_str());

    int http_get_code = http_post.POST(tmp.c_str());

    Serial.println("");
    Serial.println(http_get_code);
    if (http_get_code > 0)
    {
      digitalWrite(2, HIGH);
      delay(500);
      digitalWrite(2, LOW);
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
  p = p + 0.17;

  delay(30000);
}
