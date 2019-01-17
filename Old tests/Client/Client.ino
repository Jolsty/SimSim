/*
    This sketch establishes a TCP connection to a "quote of the day" service.
    It sends a "hello" message, and then prints received data.
*/

#include <ESP8266WiFi.h>

const char* ssid = "YattaLAB";
const char* password = "L4vor0e1mpar@";
const char* host = "192.168.1.71";
const uint16_t port = 3000;

void setup() {
  Serial.begin(115200);

  // We start by connecting to a WiFi network

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default,
     would try to act as both a client and an access-point and could cause
     network-issues with your other WiFi-devices on your WiFi-network. */
     
  WiFi.mode(WIFI_STA); // set esp8266 as station (client)
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
  Serial.print("connecting to ");
  Serial.print(host);
  Serial.print(':');
  Serial.println(port);

  // Use WiFiClient class to create TCP connections
  
  WiFiClient client;
  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    delay(5000);
    return;
  }
  
  // This will send a string to the server

  Serial.println("connected");
  Serial.println(String("sending a GET request to ") + host + ":" + port);
  client.print(String("GET /api/soci/view") + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n" +
                 "\r\n"
                );
  unsigned long timeout = millis();
  
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      delay(60000);
      return;
    }
  }
   // Read all the lines of the reply from server and print them to Serial
   while (client.connected()) {
      if (client.available()) {
         Serial.println("Reading line");
         String body = client.readStringUntil('\n');
         Serial.println(body);
      }
   }
   // Close the connection
   Serial.println();
   Serial.println("closing connection");
   delay(10000); // wait
}

