#include <WiFi.h>
#include "time.h"
#include <HTTPClient.h>
#include <esp_mac.h>
#include "DHT.h"

#define DHTPIN 14
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

char uid[13];
char *ssid = "Cell_Douglas";
char *pwd = "ursobebado";

char *ntpServer = "br.pool.ntp.org";
long gmtOffset = -3;
int daylight = 0;
time_t now;
struct tm timeinfo;

String serverName = "http://192.168.101.130:30015/SendData";

void connectWiFi() {
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
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
  dht.begin();
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  if (!getLocalTime(&timeinfo)) {
    return;
  }

  float t = dht.readTemperature();
  float u = dht.readHumidity();

  if (isnan(t) || isnan(u)) {
    delay(30000);
    return;
  }

  String payload = "{\"uid\":\"" + String(uid) + "\",\"unx\":" + String(time(&now)) +
                   ",\"temp\":" + String(t) + ",\"umi\":" + String(u) + "}";

  WiFiClient wclient;
  HTTPClient http_post;

  http_post.begin(wclient, serverName);
  http_post.addHeader("Content-Type", "application/json");
  int http_get_code = http_post.POST(payload);

  if (http_get_code > 0) {
    digitalWrite(2, HIGH);
    delay(500);
    digitalWrite(2, LOW);
  }

  http_post.end();
  delay(30000);
}
