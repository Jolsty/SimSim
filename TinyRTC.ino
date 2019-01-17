RTC_DS1307 RTC;

void rtcSetup(void) {
   RTC.begin();
   if (! RTC.isrunning()) {
      Serial.println(F("RTC is NOT running!"));
      // following line sets the RTC to the date & time this sketch was compiled
      RTC.adjust(DateTime(F(__DATE__), F(__TIME__)));
   }
}

void rtcPrintNow(void) {
   DateTime now = RTC.now(); 
   Serial.print(now.day(), DEC);
   Serial.print('/');
   Serial.print(now.month(), DEC);
   Serial.print('/');
   Serial.print(now.year(), DEC);
   Serial.print(' ');
   Serial.print(now.hour(), DEC);
   Serial.print(':');
   Serial.print(now.minute(), DEC); 
   Serial.print(':');
   Serial.print(now.second(), DEC); 
   Serial.println();
}

DateTime rtcDateTime(void) {
   return RTC.now();
}

