const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Потім імпортуй Enzyme і конфігурацію, якщо потрібно.
