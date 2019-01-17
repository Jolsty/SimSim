// Build Version

const char version[] = "Build " __DATE__ " " __TIME__;

// Relay configuration

const byte relayPin = A0;

// RFID Configuration

const byte SS_PIN = 10;
const byte RST_PIN = 9;

// Keypad Configuration

#define KEYPAD_PASSWORD "251832" // verrà cambiata
const byte keypadRows = 4;   // four rows
const byte keypadCols = 3;  // three columns
const byte keypadRowPins[keypadRows] = {5, 4, 3, 15}; // 15 = A1
const byte keypadColPins[keypadCols] = {8, 7, 6};
const char keypadConfig[keypadRows][keypadCols] =
{
   {'1','2','3'},
   {'4','5','6'},
   {'7','8','9'},
   {'*','0','#'}
};

// LCD I2C Address

const int lcdAddr = 0x27;

// Other

boolean keypadInput = false;
