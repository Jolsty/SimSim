#include <RCSwitch.h>

int i = 0;

// Change for every button!
// Clone with remote 

const char code[24] = "011100011011000110011010";

RCSwitch mySwitch = RCSwitch();

void setup() {
   
   Serial.begin(9600);

   // Transmitter is connected to Arduino Pin #A0  
   mySwitch.enableTransmit(A0);

   // Optional set pulse length.
   mySwitch.setPulseLength(600);

   // Optional set protocol (default is 1, will work for most outlets)
   mySwitch.setProtocol(1);  
   
}

void loop() {
   
   i = 0;
   
   //code is sent 4 times
   
   while ( i<4) {
      mySwitch.send(code);
      Serial.println("Code sent");
      i++;
      delay(400);
   }
   delay(3000);
}





