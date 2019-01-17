/* Organize empty areas in the EEPROM using a linked free-list, and make sure you search the   
 *whole free list for areas where the piece of data you want to store fits exactly, or 
 *within a certain acceptable margin of overhead. If you cannot find such an area, use the biggest free area. This severely reduces (if not avoids, depending on your data) fragmentation.
  */

// Continue with master password, write new cards without needing the code.
// LINKED LIST FOR STORING CARDS? 
// ONE CARD POINTS TO THE NEXT.
// CARDS OF ANY SIZE??
// USE SD INSTEAD OF EEPROM? QUERY THE SD.

// Global EEPROM Variables

void eepromSetup() {
   /*EEPROM.put(EEPROM_PTR_ADDR, 0); // initial state
   delay(5); // give enough time for a write
   eepromWriteCard("43670D268"); // master, just in case something happens; initial state */
   eepromReadAllCards();
}

void eepromReadAllCards() {
   uint16_t CARD_EEPROM_PTR; // where we're currently at - pointer to last available space
   uint16_t eeprom_ReadLoc = 0; // where we want to read
   EEPROM.get(EEPROM_PTR_ADDR, CARD_EEPROM_PTR);
   Serial.print("EEPROM_PTR ");
   Serial.println(CARD_EEPROM_PTR);
   Serial.println("Reading ALL cards from EEPROM");
   while ( eeprom_ReadLoc < CARD_EEPROM_PTR ) {
      if ( eeprom_ReadLoc != 0 && eeprom_ReadLoc%9 == 0 ) Serial.println(); // next card, print a newline
      Serial.print((char)i2c_eeprom_read_byte(eepromI2CAddr, eeprom_ReadLoc++)); // print character to serial port
   }
   Serial.println();
}

boolean eepromCheckCard(String cardNum) {
   uint16_t CARD_EEPROM_PTR; // where we're currently at - pointer to last available space
   uint16_t eeprom_ReadLoc = 0; // where we want to read
   String buff;
   EEPROM.get(EEPROM_PTR_ADDR, CARD_EEPROM_PTR);
   Serial.print("EEPROM PTR FOR CHECK: ");
   Serial.println(CARD_EEPROM_PTR);
   Serial.print("CHECKING ALL CARDS TO FIND ");
   Serial.println(cardNum);
   while ( eeprom_ReadLoc <= CARD_EEPROM_PTR ) { // iterate all the pages in eeprom (each page is 9 bytes long) 
      if ( eeprom_ReadLoc != 0 && eeprom_ReadLoc%9 == 0 ) { // card read, check it and then clear the buffer
         if (buff.equals(cardNum)) return true;
         Serial.print("BUFFERED CARD ");
         Serial.println(buff);
         buff = "";
      }
      buff.concat((char)i2c_eeprom_read_byte(eepromI2CAddr, eeprom_ReadLoc++));
   }
   return false;
}

void eepromWriteCard(char* cardNum) { // PROBLEMA CON LA SCRITTURA
   if ( strlen(cardNum) != 9 ) { 
      Serial.println("Invalid card length"); 
      return;
   }
   if ( !eepromSpaceAvailable() ) return;
   uint16_t CARD_EEPROM_PTR; // where we're currently at - pointer to last available space
   EEPROM.get(EEPROM_PTR_ADDR, CARD_EEPROM_PTR);
   Serial.print("EEPROM PTR BEFORE WRITE: ");
   Serial.println(CARD_EEPROM_PTR);
   Serial.print("Writing card: ");
   Serial.println(cardNum);
   for ( uint8_t i = 0; i < strlen(cardNum); i++ ) { // cycle takes 10*9 = 90ms
      i2c_eeprom_write_byte(eepromI2CAddr, CARD_EEPROM_PTR++, cardNum[i]);
   }
   EEPROM.put(EEPROM_PTR_ADDR, CARD_EEPROM_PTR);
   Serial.print("EEPROM PTR AFTER WRITE: ");
   Serial.println(CARD_EEPROM_PTR);
}

boolean eepromSpaceAvailable(void) {
   uint16_t CARD_EEPROM_PTR; // where we're currently at - pointer to last available space
   EEPROM.get(EEPROM_PTR_ADDR, CARD_EEPROM_PTR);
   if (CARD_EEPROM_PTR > 4096-9) {
      Serial.println("EEPROM FULL");
      return false; // max 4096 bytes into EEPROM; when we get to 4088 we stop because we won't have room for a new write.
   }
   return true;
}

void i2c_eeprom_write_byte( int deviceaddress, unsigned int eeaddress, byte data ) {
    int rdata = data;
    Wire.beginTransmission(deviceaddress);
    /* 
     * The first send function takes the eeaddress and shifts the bits to the right by eight which moves the higher 
     * end of the 16 bit address down to the lower eight bits. Next we do a bitwise AND to get just the last eight bits. 
     * To illustrate this lets follow the steps below.
     * Lets say we want to write to address location 20,000 which is 0100 1110 0010 0000 in binary. 
     * We need to send the MSB(Most significant bits) first so we have to shift our address to the right eight bits.
     * 0100 1110 0010 0000 (eeaddress)
     * After shifting 8 bits to the right we have
     * 0100 1110
     * We now have the first half of the address, time to get the second half:
     * 0100 1110 0010 0000 (eeaddress)
     * After we bitwise AND 0xFF with eeadddress we get 0010 0000
     * 
     * This means our 24LC256 chip gets the address 1001 1100 and then 0010 0000 which tells it to store 
     * the next byte in address location 20,000. Now that we’ve sent the address we send the data and then we end 
     * the process by calling the endTransmission function. The 24LC256 gets the data and writes the data to that address location. 
     * To finish up this function you’ll notice I’ve included a delay of 5 milliseconds. This allows the chip time to complete the write operation, 
     * without this if you try to do sequential writes weird things might happen.  
     */
    Wire.write((int)(eeaddress >> 8)); // MSB logical shift right = 8;
    Wire.write((int)(eeaddress & 0xFF)); // LSB mask
    Wire.write(rdata);
    Wire.endTransmission();
    delay(10); // give enough time for a write (so we don't have a problem in loops)
}

byte i2c_eeprom_read_byte( int deviceaddress, unsigned int eeaddress ) {
    byte rdata = 0xFF;
    Wire.beginTransmission(deviceaddress);
    Wire.write((int)(eeaddress >> 8)); // MSB
    Wire.write((int)(eeaddress & 0xFF)); // LSB
    Wire.endTransmission();
    Wire.requestFrom(deviceaddress,1);
    if (Wire.available()) rdata = Wire.read();
    return rdata;
}

/*void dump_eeprom()
{                                                           //  #10b
   for (uint16_t h = 0;h < cardLength;h++)                          // prima riga riporta il puntatore in 4 e 5
   {  byte readByte = i2c_eeprom_read_byte(eepromI2CAddr, h );      // 
      Serial.print( readByte );
      Serial.print(' ');
   }  
   Serial.println();                                        // a capo
   for (uint16_t h = cardLength;h < 260;h += cardLength)                    // le righe successive riportano ciascuna un codice registrato
   {  
      bool fine = false;
      for (uint8_t k = 0; k < cardLength; k++)                      // 10 caratteri per riga
      {  
         byte readByte = i2c_eeprom_read_byte(eepromI2CAddr, h + k );      // 
         //if (isHexadecimalDigit(f))
         //{  
            Serial.write( readByte );
         //}
         //else
         //{  fine = true;
           // break;
         //}
      }
      //if (fine) break;
      Serial.println();                                      
   }
}*/



