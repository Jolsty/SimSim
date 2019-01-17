// Global keypad variables

char pressedKey;
uint32_t lastKeyPressMillis;
const uint32_t keypadDisableInterval = 5000;
const uint8_t passwordLength = 6; 
uint8_t lcdCol = 0;
String keypadAcceptedPassword = KEYPAD_PASSWORD;

// Objects

Keypad keypad = Keypad(makeKeymap(keypadConfig), keypadRowPins, keypadColPins, keypadRows, keypadCols);

// Functions

void keypadLoop(void) {
   if ( keypadReadKeyPress() && !keypadInput ) {
      lcdInsertPasswordMode();
      Serial.println(F("First key press: keypad activated"));
      keypadInput = true;
      keypadReadPassword();
   }  
}

boolean keypadReadKeyPress(void) {
   // LCD insert password mode
   pressedKey = keypad.getKey();
   if ( pressedKey != NO_KEY ) {
      lcdPrint("*", lcdCol++, 1);
      lastKeyPressMillis = millis();
      Serial.println(pressedKey + String(" pressed at ") + lastKeyPressMillis);
      return true;
   }
   else return false;
}  

void keypadReadPassword(void) {
   
   // first key already pressed: store it
   
   String insertedPassword = "";
   insertedPassword.concat(pressedKey); // first character
   uint8_t passwordCount = 1;
   
   // on a timer or until disabled
   
   while (keypadInput && !keypadTimeElapsed()) {
      rfDisableReceive();
      if ( pressedKey == '#' ) keypadInput = false; // if # is inserted then we exit loop
      if ( keypadReadKeyPress() ) {
         insertedPassword.concat(pressedKey);
         passwordCount++;
      }
      if ( passwordCount >= passwordLength ) {
         Serial.println(String("Inserted password ") + insertedPassword);
         
         // check if password correct, otherwise try again message and clear everything
         
         if ( keypadCheckPassword(insertedPassword) ) {
            Serial.print(F("PASSWORD ACCEPTED at "));
            rtcPrintNow();
            lcdPasswordAccepted();
            relayIntervalON(1);
            sendLog("keypad");
            keypadInput = false;
         } 
         else {
            Serial.println(F("PASSWORD DENIED, TRY AGAIN"));
            lcdPasswordDenied();
            insertedPassword = "";
            passwordCount = 0;
            keypadInput = false;
         }
      }
   } // when we exit loop or time runs out disable keypad input
   rfEnableReceive();
   keypadInput = false;
   lcdCol = 0;
   lcdHomeMode();
   Serial.println(F("Keypad disabled")); 
   return;
}

boolean keypadCheckPassword(String &insertedPassword) {
   if ( insertedPassword.equals(keypadAcceptedPassword) ) return true;
   else return false;
}

boolean keypadTimeElapsed(void) {
   if ( (millis() - lastKeyPressMillis) < keypadDisableInterval ) return false;
   else return true;
}

