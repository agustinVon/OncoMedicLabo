import { JSHash, CONSTANTS } from "react-native-hash";

export const hashPassword = async (password , passFunction) => {
    JSHash(password,CONSTANTS.HashAlgorithms.sha256)
    .then( (hash) => {
        console.log('hash = ' + hash)
        passFunction(hash)
    })
}