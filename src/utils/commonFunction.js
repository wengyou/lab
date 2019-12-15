import {notification} from "antd";
import CryptoJS from "crypto-js";
//密钥
const key = CryptoJS.enc.Utf8.parse("GeEk_1s_AwEs0Me!");
//密钥偏移量
const iv = CryptoJS.enc.Utf8.parse('ImH@ckErabcdefgh');

export const random = (lower, upper) => {
    return Math.floor(Math.random() * (upper - lower)) + lower;
};

export const scrollAnimation = (currentY = 0, targetY) => {
    let needScrollTop = targetY - currentY;
    let _currentY = currentY;
    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10);
        _currentY += dist;
        window.scrollTo(_currentY, currentY);
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
            scrollAnimation(_currentY, targetY)
        } else {
            window.scrollTo(_currentY, targetY)
        }
    }, 1)
};

export const openNotification = (message, description = " ") => {
    notification.open({
        message,
        description,
        placement: "bottomRight",
        duration: "2"
    });
};

export const checkEmail = (str=null) => {
    const pattern = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return pattern.test(str);
};

export const isChinese= (str=null) => {
    const pattern = /[\u4e00-\u9fa5]/;
    return pattern.test(str);
};

export const checkNumber = (str=null) => {
    const pattern = /^[0-9]*$/;
    return pattern.test(str)
};

export const checkNumAndEng = (str=null) => {
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/;
    return pattern.test(str);
};

export const browserRedirect = () => {
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    const bIsMidp = sUserAgent.match(/midp/i) == "midp";
    const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    const bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    const bIsAndroid = sUserAgent.match(/android/i) == "android";
    const bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    const bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return "mobile";
    } else {
        return "pc";
    }
};
//加密方法
export const Encrypto = str => {
    let srcs = CryptoJS.enc.Utf8.parse(str);
    let encrypted = CryptoJS.AES.encrypt(
        srcs,
        key,
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );
    return encrypted.ciphertext.toString().toUpperCase();
};
//解密方法
export const Decrypt = str => {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(str);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
};

//对象转FormData对象

//获取数组中对象的属性
export const GetArrayProps= (array, key) => {
    let key0 = key || "value";
    let res = [];
    if (array) {
        array.forEach(function(t) {
            res.push(t[key0]);
        });
    }
    return res;
};

//绑定键盘事件
export const OnKeyDown = e => {
    e.onkeydown = function (event) {
        const code = event.keyCode;
        if (code === 13) {
            e.focus();
        }
    }
};