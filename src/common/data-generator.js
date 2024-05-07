"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const data = __importStar(require("src/common/dummy-data"));
const helpers_1 = require("src/common/helpers");
class DataGenerator {
    randomNumber(start, end, decimalPlaces = 0) {
        const min = Math.ceil(start);
        const max = Math.floor(end);
        let result = Math.random() * (max - min + 1) + min;
        if (decimalPlaces > 0) {
            result = Number(result.toFixed(decimalPlaces));
            result = result > max ? max : result;
            return result;
        }
        return Math.floor(result);
    }
    scrambledWord(minLength = 3, maxLength = 15) {
        const wordLength = this.randomNumber(minLength, maxLength);
        let resultWord = "";
        let odd = true;
        while (resultWord.length < wordLength) {
            const newSymbol = odd
                ? data.consonants[Math.floor(Math.random() * data.consonants.length)]
                : data.vowels[Math.floor(Math.random() * data.vowels.length)];
            odd = !odd;
            resultWord += newSymbol;
        }
        return resultWord;
    }
    words(wordCount, maxLength = 0) {
        let resultPhrase = "";
        let word = "";
        for (let i = 0; i < wordCount; i += 1) {
            word = data.wordBank[Math.floor(Math.random() * (data.wordBank.length - 1))];
            const phraseLength = resultPhrase.length;
            if (phraseLength === 0 ||
                resultPhrase.substring(phraseLength - 1, phraseLength) === "." ||
                resultPhrase.substring(phraseLength - 1, phraseLength) === "?") {
                word = word.substring(0, 1).toUpperCase() + word.substring(1, word.length);
            }
            resultPhrase += phraseLength > 0 ? ` ${word}` : word;
        }
        if (maxLength && maxLength > 0) {
            resultPhrase = resultPhrase.substring(0, maxLength);
        }
        return resultPhrase;
    }
    alphanumeric(template) {
        const count = template.length;
        let i = 0;
        let returnValue = "";
        let currentCharacter = "";
        let ignore = false;
        for (; i < count; i += 1) {
            currentCharacter = template[i];
            if (currentCharacter === "]") {
                ignore = false;
                // eslint-disable-next-line no-continue
                continue;
            }
            if (currentCharacter === "[") {
                ignore = true;
                // eslint-disable-next-line no-continue
                continue;
            }
            if (ignore) {
                currentCharacter = "";
            }
            const alphabetsLength = data.alphabets.length;
            const consonantsLength = data.consonants.length;
            const vowelsLength = data.vowels.length;
            switch (currentCharacter) {
                case "L":
                    returnValue += data.alphabets[Math.floor(Math.random() * (alphabetsLength - 1))].toUpperCase();
                    break;
                case "l":
                    returnValue += data.alphabets[Math.floor(Math.random() * (alphabetsLength - 1))].toLowerCase();
                    break;
                case "D":
                    returnValue +=
                        Math.random() > 0.5
                            ? data.alphabets[Math.floor(Math.random() * (alphabetsLength - 1))].toUpperCase()
                            : data.alphabets[Math.floor(Math.random() * (alphabetsLength - 1))].toLowerCase();
                    break;
                case "C":
                    returnValue += data.consonants[Math.floor(Math.random() * (consonantsLength - 1))].toUpperCase();
                    break;
                case "c":
                    returnValue += data.consonants[Math.floor(Math.random() * (consonantsLength - 1))].toLowerCase();
                    break;
                case "E":
                    returnValue +=
                        Math.random() > 0.5
                            ? data.consonants[Math.floor(Math.random() * (consonantsLength - 1))].toUpperCase()
                            : data.consonants[Math.floor(Math.random() * (consonantsLength - 1))].toLowerCase();
                    break;
                case "V":
                    returnValue += data.vowels[Math.floor(Math.random() * (vowelsLength - 1))].toUpperCase();
                    break;
                case "v":
                    returnValue += data.vowels[Math.floor(Math.random() * (vowelsLength - 1))].toLowerCase();
                    break;
                case "F":
                    returnValue +=
                        Math.random() > 0.5
                            ? data.vowels[Math.floor(Math.random() * (vowelsLength - 1))].toUpperCase()
                            : data.vowels[Math.floor(Math.random() * (vowelsLength - 1))].toLowerCase();
                    break;
                case "X":
                    returnValue += this.randomNumber(1, 9);
                    break;
                case "x":
                    returnValue += this.randomNumber(0, 9);
                    break;
                default:
                    returnValue += template[i];
                    break;
            }
        }
        return returnValue;
    }
    paragraph(minWords, maxWords, maxLength) {
        const wordCount = this.randomNumber(minWords, maxWords);
        const resultPhrase = this.words(wordCount, maxLength);
        return resultPhrase.replace(/[?.!,;]?$/, ".");
    }
    phrase(maxLength) {
        const length = this.randomNumber(5, 20);
        const resultPhrase = this.words(length, maxLength);
        return resultPhrase.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    }
    website() {
        const scrambledWord = this.scrambledWord().toLowerCase();
        const randomDomain = data.domains[this.randomNumber(0, data.domains.length - 1)];
        return `https://www.${scrambledWord}${randomDomain}`;
    }
    phoneNumber(template = helpers_1.DEFAULT_TELEPHONE_TEMPLATE) {
        let i = 0;
        let telephone = "";
        for (; i < template.length; i += 1) {
            if (template[i] === "X") {
                telephone += this.randomNumber(1, 9);
            }
            else if (template[i] === "x") {
                telephone += this.randomNumber(0, 9);
            }
            else {
                telephone += template[i];
            }
        }
        return telephone;
    }
    date(minimumDate, maximumDate) {
        let randomYear;
        let randomMonth;
        let randomDay;
        if (minimumDate && maximumDate) {
            const randomDate = new Date(+minimumDate + Math.random() * (+maximumDate - +minimumDate));
            randomYear = randomDate.getFullYear();
            randomMonth = randomDate.getMonth() + 1;
            randomDay = randomDate.getDate();
        }
        else {
            randomYear = this.randomNumber(1970, new Date().getFullYear());
            randomMonth = this.randomNumber(1, 12);
            randomDay = this.randomNumber(1, 28);
        }
        const formattedYear = String(randomYear);
        const formattedMonth = `0${randomMonth}`.slice(-2);
        const formattedDay = `0${randomDay}`.slice(-2);
        return `${formattedYear}-${formattedMonth}-${formattedDay}`;
    }
    time() {
        const randomHour = `0${this.randomNumber(0, 23)}`.slice(-2);
        const randomMinute = `0${this.randomNumber(0, 59)}`.slice(-2);
        return `${randomHour}:${randomMinute}`;
    }
    month() {
        return `0${this.randomNumber(1, 12)}`.slice(-2);
    }
    year() {
        return String(this.randomNumber(1970, new Date().getFullYear()));
    }
    weekNumber() {
        return `0${this.randomNumber(1, 52)}`.slice(-2);
    }
    firstName() {
        return data.firstNames[this.randomNumber(0, data.firstNames.length - 1)];
    }
    lastName() {
        return data.lastNames[this.randomNumber(0, data.lastNames.length - 1)];
    }
    organizationName() {
        const partOne = this.lastName();
        const connector = Math.random() > 0.5 ? " and " : " ";
        const partTwo = this.lastName();
        const suffix = data.organizationSuffix[this.randomNumber(0, data.organizationSuffix.length - 1)];
        return `${partOne}${connector}${partTwo} ${suffix}`;
    }
    color() {
        // 16777215 === FFFFFF in decimal
        return `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")}`;
    }
}
exports.default = DataGenerator;
