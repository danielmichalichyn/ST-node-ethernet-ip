/**
 * Wraps a Promise with a Timeout
 *
 * @param {Tag} tag - Tag Object to Write
 * @param {number} - Timeout Length (ms)
 * @param {Error|string} - Error to Emit if Timeout Occurs
 * @returns {Promise}
 * @memberof Controller
 */
const promiseTimeout = (promise, ms, error = new Error("ASYNC Function Call Timed Out!!!")) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(error), ms);
        promise.then(resolve).catch(reject);
    });
};

/**
 * Delays X ms
 *
 * @param {number} ms - Delay Length (ms)
 * @returns {Promise}
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


// Helper Funcs to process strings
const bufferToString = buff => {
    const len = buff.readUInt32LE();
    return buff.slice(4, len + 4).toString();
};

const stringToBuffer = (str, len = 88) => {
    const buf = Buffer.alloc(len);
    str = str.slice(0, 82);
    buf.writeUInt32LE(str.length);
    Buffer.from(str).copy(buf, 4);
    return buf;
};

const objToString = obj => {
    return String.fromCharCode(...obj.DATA.slice(0,obj.LEN));
};

const stringToObj = str => {
    
    const array = Array(82).fill(0);
    [...str].forEach( (c, k) => {
        array[k] = c.charCodeAt();
    });

    return {
        LEN: str.length,
        DATA: array
    };
};

const stringToBufferLE = (str,size) => {
    str = str.toString(16);
    // Adding padding to the hex string and converting from BE to LE.
    while (str.length < size) {
        str = '0' + str;
    };
    str = str.match(/.{1,2}/g);
    // Reverse the string from Big Endian to Little Endian.
    return Buffer.from(str.reverse().join("").toString(16),'hex');
};

module.exports = { promiseTimeout, delay, stringToBuffer, bufferToString, objToString, stringToObj, stringToBufferLE };
