// Objects

LiquidCrystal_PCF8574 lcd(lcdAddr);  // set the LCD address to 0x27 for a 16 chars and 2 line display

// Functions

void lcdSetup(void) {
   Wire.beginTransmission(lcdAddr);
   if ( Wire.endTransmission() == 0 ) Serial.println(F("LCD OK"));
   else Serial.println(F("LCD MISSING"));
   lcd.begin(16,2);
   lcd.noBlink();
   lcdHomeMode();
}

void lcdHomeMode(void) {
   lcd.setBacklight(0);
   lcd.clear();
}

void lcdInsertPasswordMode(void) {
   lcd.setBacklight(255);
   lcd.setCursor(0,0);
   lcd.print("Insert password"); 
}

void lcdPrint(String string, uint8_t col, uint8_t row) {
   lcd.setCursor(col,row);
   lcd.print(string);
}

void lcdPasswordDenied(void) {
   lcd.clear();
   lcd.setCursor(0,0);
   lcd.print("WRONG PASSWORD!");
   lcd.setCursor(0,1);
   lcd.print("TRY AGAIN");
   delay(2000);
   lcdHomeMode();
}

void lcdPasswordAccepted(void) {
   lcd.clear();
   lcd.setCursor(0,0);
   lcd.print("PASSWORD");
   lcd.setCursor(0,1);
   lcd.print("ACCEPTED");
   delay(2000);
   lcdHomeMode();
}


void lcdCardAccepted(void) {
   lcd.clear();
   lcd.setBacklight(255);
   lcd.setCursor(0,0);
   lcd.print("CARD");
   lcd.setCursor(0,1);
   lcd.print("ACCEPTED");
   delay(2000);
   lcdHomeMode();
}

void lcdCardDenied(void) {
   lcd.clear();
   lcd.setBacklight(255);
   lcd.setCursor(0,0);
   lcd.print("CARD");
   lcd.setCursor(0,1);
   lcd.print("DENIED");
   delay(2000);
   lcdHomeMode();
}

void lcdProcessingCard(void) {
   lcd.clear();
   lcd.setBacklight(255);
   lcd.setCursor(0,0);
   lcd.print("PROCESSING");
   lcd.setCursor(0,1);
   lcd.print("CARD");
}


