const chineseNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const chineseUnits = ["", "十", "百", "千"];
const chineseBigUnits = ["", "萬", "億", "兆", "京", "垓", "秭", "穰", "溝", "澗", "正", "載", "極"];

function convertToChineseNumber(number) {
    if (number === 0) {
        return chineseNumbers[0];
    }

    const digits = number.toString().split('').map(Number);
    const digitCount = digits.length;

    let chineseNumber = "";
    let groupCount = Math.ceil(digitCount / 4);

    for (let i = 0; i < groupCount; i++) {
        const groupNumber = digits.slice(digitCount - (i + 1) * 4 > 0 ? digitCount - (i + 1) * 4 : 0, digitCount - i * 4);
        // console.log(groupNumber);

        let groupChineseNumber = convertGroupToChinese(Number(groupNumber.join('')));

        if (groupChineseNumber == chineseNumbers[0]) {
            if (i == 0) {
                groupChineseNumber = "";
            } else {
                // 避免重复添加零
                let isNonZeroAhead = false;
                for (let j = i + 1; j < groupCount; j++) {
                    if (digits.slice(digitCount - (j + 1) * 4 > 0 ? digitCount - (j + 1) * 4 : 0, digitCount - j * 4).join('') !== "0000") {
                        isNonZeroAhead = true;
                        break;
                    }
                }
                if (isNonZeroAhead) {
                    groupChineseNumber = chineseNumbers[0];
                } else {
                    groupChineseNumber = "";
                }
                chineseNumber = groupChineseNumber  + chineseNumber;
            }
        } else {
            // console.log(groupChineseNumber);
            const groupUnit = chineseBigUnits[i];

            chineseNumber = groupChineseNumber + groupUnit + chineseNumber;
        }
    }

    return chineseNumber;
}

function convertGroupToChinese(number) {
    if (number === 0) {
        return chineseNumbers[0];
    }

    const digits = number.toString().split('').map(Number);
    const digitCount = digits.length;
    let chineseNumber = "";

    for (let i = 0; i < digitCount; i++) {
        const digit = digits[i];
        const unit = chineseUnits[digitCount - i - 1];

        if (digit !== 0) {
            // 處理 10 的特殊情况
            if (digit === 1 && i === 0 && digitCount == 2) {
                chineseNumber += unit;
            } else {
                chineseNumber += chineseNumbers[digit] + unit;
            }
        } else {
            // 避免在最高單位時添加零
            if (i !== digitCount - 1) {
                // 避免重复添加零
                let isNonZeroAhead = false;
                for (let j = i + 1; j < digitCount; j++) {
                    if (digits[j] !== 0) {
                        isNonZeroAhead = true;
                        break;
                    }
                }
                if (isNonZeroAhead) {
                    chineseNumber += chineseNumbers[digit];
                }
            }
        }
    }

    return chineseNumber;
}

// 示例用法
// for (let i = 0; i < 100000; i++) {
//   console.log(`${i}\t${convertGroupToChinese(i)}`);
// }

// console.log(convertGroupToChinese(1024));
console.log(convertToChineseNumber(23000000));