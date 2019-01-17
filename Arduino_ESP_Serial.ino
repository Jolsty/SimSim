// Global variables

const uint32_t espTimeoutInterval = 5000; 

// Objects

SoftwareSerial ESP(16, 17); // A2 - yellow(tx); A3 - blue(rx)

void arduinoEspSerialSetup() {
   ESP.begin(9600);
}

boolean checkCardSerial(String serial) {
   
   boolean allowed = false;
   String bodyJSON = "check{\"seriale\":\"" + serial + "\"}"; // per tessera
   int statusCode = printBodyToESP(bodyJSON);
   Serial.println("Status code " + String(statusCode));
   switch (statusCode) {
      case 200:
         sendLogTessera(serial);
         allowed = true;
         break;
      case 400:
         Serial.println("Bad Request");
         break;
      case 401:
         Serial.println("Card present in database but not activated. Access denied."); 
         break;
      case 404:
         Serial.println("Card not present in the database. Access denied."); 
         break;
      default:
         Serial.println("Unknown statusCode");
   }
   return allowed;
}

void sendLogTessera(String serial){
   
   String date = getCurrentFormattedDate();
   String bodyJSON = "log{\"data\":\"";
   bodyJSON.concat(date);
   bodyJSON.concat("Z\",\"tipo\":\"tessera\",\"seriale\":\"" + serial + "\"}\0");    
   int statusCode = printBodyToESP(bodyJSON);
   if (statusCode == 200) Serial.println("Log sent");
   else {
      Serial.print("Problem with sending log. Code: ");
      Serial.println(statusCode);
   }
}

void sendLog(String tipo) {
   
   String date = getCurrentFormattedDate();  
   String bodyJSON = "log{\"data\":\"";
   bodyJSON.concat(date); 
   bodyJSON.concat("Z\",\"tipo\":\"" + tipo + "\"}\0"); 
   int statusCode = printBodyToESP(bodyJSON);
   if (statusCode == 200) Serial.println("Log sent");
   else Serial.println("Problem with sending log. Code: " + String(statusCode));
}

int printBodyToESP(String bodyJSON) { // returns statusCode
   int statusCode;
   ESP.print(bodyJSON);
   delay(100);
   uint32_t lastMillis = millis();
   while (!ESP.available()) { 
      if (!checkTimeout(lastMillis)) {
         break; 
      }
   }   
   // now it's available; read it (the esp only sends codes)
   statusCode = uint32_t(ESP.parseInt());
   return statusCode;
}


boolean checkTimeout(uint32_t lastMillis) {
   if ( (millis() - lastMillis) < espTimeoutInterval ) return true;
   else return false;    
}

String getCurrentFormattedDate(void) {
   String year, month, day, hour, minute, second;
   DateTime now = rtcDateTime();

   year = String(now.year());

   if (now.month() < 10) {
      month = "0" + String(now.month());
   } else month = String(now.month());

   if (now.day() < 10) {
      day = "0" + String(now.day());
   } else day = String(now.day());
   
   if (now.hour() < 10) {
      hour = "0" + String(now.hour());
   } else hour = String(now.hour());
   
   if (now.minute() < 10) {
      minute = "0" + String(now.minute());
   } else minute = String(now.minute());
   
   if (now.second() < 10) {
      second = "0" + String(now.second());
   } else second = String(now.second());
   
   String date = "";
   date.concat(year);
   date.concat("-");
   date.concat(month);
   date.concat("-");
   date.concat(day);
   date.concat("T");
   date.concat(hour);
   date.concat(":");
   date.concat(minute);
   date.concat(":");
   date.concat(second);
   return date;
}


