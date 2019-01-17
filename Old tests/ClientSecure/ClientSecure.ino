#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

const char* ssid = "YattaLAB";
const char* password = "L4vor0e1mpar@";

const char* write_key = "N13HRVEM11COJE6I";
const char* read_key = "K15JN9WQAMPFVK3W";

const char* host = "api.thingspeak.com";
const int httpsPort = 443; // default https port

WiFiClientSecure client;

// Use web browser to view and copy
// SHA1 fingerprint of the certificate
/* We can obtain the fingerprint for specific 
host using a web browser. For instance on Chrome press 
Ctrl+Shift+I and go to Security > View Certificate > Details > Thumbprint. 
This will show a window like below where you can copy the fingerprint and paste it into sketch.*/
const char* fingerprint = "f9c2656cf9ef7f668bf735fe15ea829f5f55543e";

void setup() {
   Serial.begin(115200);
   Serial.println();
   Serial.print("Connecting to ");
   Serial.println(ssid);
   WiFi.mode(WIFI_STA);
   WiFi.begin(ssid, password);
   while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
      }
   Serial.println("");
   Serial.println("WiFi connected");
   Serial.println("IP address: ");
   Serial.println(WiFi.localIP());
 
}

void loop() {
   Serial.print("Connecting to ");
   Serial.println(host);
   if (!client.connect(host, httpsPort)) {
      Serial.println("Connection failed");
      return;
   }
   if (client.verify(fingerprint, host)) {
      Serial.println("Certificate matches");
      /* If this check fails, it is up to you to decide if to proceed further 
      or abort connection. Also note that certificates have specific validity period. 
      Therefore the fingerprint of certificate we have checked today, will certainly be 
      invalid some time later.
      - remember that certificates expire and are renewed!!!! 
      - might need to renew it manually by changing this code */
    } else {
      Serial.println("certificate doesn't match");
    }
   //thingspeakWriteField1(write_key, "aaaa");
   thingspeakGetField1(read_key);
   checkConnectionTimeOut();
   delay(300000); // repeat after a while - da fare non-blocking ... millis() vs tickerscheduler?
}  // check ESP specific API https://arduino-esp8266.readthedocs.io/en/latest/libraries.html#wifi-esp8266wifi-library

void thingspeakWriteField1(const char* key, const char* field) {
   // GET https://api.thingspeak.com/update?api_key=N13HRVEM11COJE6I&field1=0
   String url = "/update?api_key=";
   url.concat(key);
   url.concat("&field1=");
   url.concat(field);
   Serial.println("Requesting URL: " + url);
   client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: BuildFailureDetectorESP8266\r\n" +
               "Connection: close\r\n\r\n");
   Serial.println("Request sent");
   getResponse();
}

void thingspeakGetField1(const char* key) {
   // https://api.thingspeak.com/channels/626548/fields/1.json?api_key=K15JN9WQAMPFVK3W
   String url = "channels/626548/fields/1.json?api_key=";
   url.concat(key);
   Serial.println("Requesting URL: " + url);
   client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: BuildFailureDetectorESP8266\r\n" +
               "Connection: close\r\n\r\n");
   Serial.println("Request sent");
   getResponse();
}

void checkConnectionTimeOut(void) { // fix
   unsigned long timeout = millis();
   while ( !client.available() ) {
      if (millis() - timeout > 5000) {
         Serial.println("Client timeout. Retrying in 1 minute");
         client.stop();
         delay(60000); // wait 1 minute and retry
         return;
      }
   }
}

void getResponse(void) {
   int i = 0;
   while (client.connected()) {
      if ( client.available() ) {
         String line = client.readStringUntil('\n');
         //if ( line.equals("Status: 200 OK") ) Serial.println("OK");
         Serial.print(i++);
         Serial.print(" ");
         //if ( line.equalsIgnoreCase(String("Status: 200 OK")) ) Serial.println("200 OK");
         Serial.println(line);
      }
   }
   Serial.println("Closing connection");
}

