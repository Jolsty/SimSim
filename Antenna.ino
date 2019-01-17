/*
 *  Remote codes
 *
 *  Button A: 7451031
 *  Button B: 7451032
 *  Button C: 7451033
 *  Button D: 7451034
 *
 */

// Objects

RCSwitch rfReceiver = RCSwitch();

// Functions

void rfSetup(void) {
   rfReceiver.enableReceive(0); // interrupt 0 = digital pin 2
}

void rfLoop(void) {
   if ( rfReceiver.available() && rfReceiver.getReceivedProtocol() == 1 ) {
      switch ( rfReceiver.getReceivedValue() ) {
         case 7451031: // hash the values? more security
            Serial.print(F("Pressed A at "));
            rtcPrintNow();
            relayIntervalON(1);
            sendLog("telecomando");
            break;
         case 7451032:
            Serial.print(F("Pressed B at "));
            rtcPrintNow();
            relayIntervalON(1);
            sendLog("telecomando");
            break;
         case 7451033:
            Serial.println(F("Pressed C at "));
            rtcPrintNow();
            relayIntervalON(1);
            sendLog("telecomando");
            break;
         case 7451034:
            Serial.println(F("Pressed D at "));
            rtcPrintNow();
            relayIntervalON(1);
            sendLog("telecomando");
            break;
      }
      rfReceiver.resetAvailable();
   }
}

void rfDisableReceive(void) {
   rfReceiver.disableReceive();
}

void rfEnableReceive(void) {
   rfReceiver.enableReceive(0);
}
