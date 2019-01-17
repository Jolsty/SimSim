/*
 * This code must be flashed onto the ESP8266.
 * Read the README to see how to do it.
 */

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "wifi_secrets.h"
 
const char* ssid = SECRET_SSID;
const char* password = SECRET_PASS;
 
void setup () {
   
   Serial.begin(9600);
   WiFi.begin(ssid, password);
   Serial.print("Connecting to Wi-Fi network");
   while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.print(".");
   }
   Serial.println("connected");
}
 
void loop() {
   
   if ( WiFi.status() == WL_CONNECTED ) { // Check WiFi connection status
      while ( !Serial.available() ) 
         ; // deep sleep?
      String from_arduinoJSON = Serial.readStringUntil('\n');
      if (from_arduinoJSON.startsWith("check")) checkTesseraAPI(from_arduinoJSON.substring(5));
      if (from_arduinoJSON.startsWith("log")) sendLogAPI(from_arduinoJSON.substring(3));
   } else Serial.println("Not connected to Wi-Fi");
}

void checkTesseraAPI(String tesseraJSON) {
   HTTPClient http;  
   http.begin("http://192.168.1.71:3000/api/tessere/check");
   http.addHeader("Content-Type", "text/plain");
   int statusCode = http.POST(tesseraJSON);
   Serial.println(statusCode);
   http.end();
}

void sendLogAPI(String logJSON) {
   HTTPClient http;  
   http.begin("http://192.168.1.71:3000/api/logs/add");
   http.addHeader("Content-Type", "text/plain");
   int statusCode = http.POST(logJSON);
   Serial.println(statusCode);
   http.end();
}



