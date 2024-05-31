module.exports.generateRandomString = (length) => {
    const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let randomString = "";

    for(let i = 0; i < length; i++){
        randomString += string.charAt(Math.floor(Math.random() * string.length));
    }

    return randomString;
}

module.exports.generateRandomNumber = (length) => {
    const characters = "0123456789";

    let result = "";

    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}