if (typeof TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder;
}

if (typeof TextDecoder === 'undefined') {
    global.TextDecoder = require('util').TextDecoder;
}

if (typeof ReadableStream === 'undefined') {
    global.ReadableStream = require('node:stream/web').ReadableStream;
}

export {};
