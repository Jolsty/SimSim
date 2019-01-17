#include <SoftwareSerial.h>

SoftwareSerial ESP(16, 17); // A2 - yellow(tx); A3 - blue(rx)

const uint32_t espTimeoutInterval = 5000; 

void setup() {
   
   Serial.begin(9600);
   ESP.begin(9600);
}

void loop() {
   String tessera = "TESSERA_PROVA";
   if (checkTessera(tessera)) Serial.println("Tessera accettata");
   else Serial.println("Something happened");
   delay(5000);  
}

boolean checkTessera(String tessera) {
   boolean allowed = false;
   String bodyJSON = "check{\"seriale\":\" " + tessera + "\"}"; // per tessera
   ESP.println(bodyJSON);
   uint32_t lastMillis = millis();
   while (!ESP.available()) {
      Serial.println("here"); 
      if (checkTimeout(lastMillis)) break; 
   }
   int statusCode = ESP.parseInt();
   if (statusCode == 200) {
      sendLogTessera(tessera);
      allowed = true;
   } else Serial.println(statusCode);
   return allowed;      
}

void sendLogTessera(String tessera){
   Serial.println("Must send log for tessera " + tessera);
   String bodyJSON = "log{\"data\":\"1994-12-13T10:10:10Z\",\"tipo\":\"tessera\",\"seriale\":\" " + tessera + "\"}"; // per log
   ESP.println(bodyJSON);
   uint32_t lastMillis = millis();
   while (!ESP.available()) {
      if (checkTimeout(lastMillis)) break; 
   }
   int statusCode = ESP.parseInt();
   if (statusCode == 200) {
      Serial.println("Log mandato");
   } else Serial.println("Ho riscontrato un problema mentre mandavo il log");
}

boolean checkTimeout(uint32_t lastMillis) {
   if ( (millis() - lastMillis) < espTimeoutInterval ) return false;
   else return true;    
}


