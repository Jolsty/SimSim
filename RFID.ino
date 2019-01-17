// RFID global variables

uint16_t cardCounter = 4; // change
String currentCardNumber;
// Objects

MFRC522 rfid(SS_PIN, RST_PIN);

// Functions

void rfidSetup(void) {
   SPI.begin();
   rfid.PCD_Init(); ;
}

void rfidLoop(void) {
   if ( !rfidCardRead() ) return;
   rfDisableReceive();
   Serial.println(String("Read card: ") + currentCardNumber);
   lcdProcessingCard();
   if ( checkCardSerial(currentCardNumber) ) {
      Serial.print("CARD " + String(currentCardNumber) + " ACCEPTED at ");
      rtcPrintNow();
      lcdCardAccepted();
      relayIntervalON(1);
   } else {
      Serial.println(F("CARD DENIED"));
      lcdCardDenied();
   }
   rfEnableReceive();
}

boolean rfidCardRead(void) {
   if ( !rfid.PICC_IsNewCardPresent() ) return false;
   if ( !rfid.PICC_ReadCardSerial() ) return false;
   currentCardNumber = "";
   for ( uint8_t i=0; i<5; i++ ) {
      currentCardNumber.concat(String(rfid.uid.uidByte[i], HEX));
   }
   currentCardNumber.toUpperCase();
   rfid.PICC_HaltA(); // stop reading
   return true;
}   
