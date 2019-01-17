// Dependencies

#include "constants.h" // global constants
#include <MFRC522.h> // used in RFID
#include <SPI.h> // used in RFID
#include <LiquidCrystal_PCF8574.h> // used in LCD
#include "RTClib.h" // used in TinyRTC
#include <RCSwitch.h> // used in Antenna
#include <Keypad.h> // used in Keypad
#include <SoftwareSerial.h> // used for serial communication between Arduino and ESP
#include <Wire.h> /* used in LCD - I2C communication
                   * SDA - Green - A4
                   * SCL - Yellow - A5
                   */
// Functions

void setup(void) {
   Serial.begin(9600);
   Serial.println(version);
   Wire.begin(); // start I2C
   pinMode(relayPin, OUTPUT);
   rfidSetup();
   lcdSetup();
   rfSetup();
   rtcSetup();
   arduinoEspSerialSetup();
}

void loop(void) {
   keypadLoop();
   rfidLoop();
   rfLoop();
}

void relayIntervalON(int seconds) {
   digitalWrite(relayPin, HIGH);
   Serial.println(F("RELAY ON"));
   delay(seconds*1000);
   digitalWrite(relayPin, LOW);
   Serial.println(F("RELAY OFF"));
}

