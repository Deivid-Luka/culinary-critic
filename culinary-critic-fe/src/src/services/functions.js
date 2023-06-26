const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
};

const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
};

const getKeyFromLS = (key) => {
    let keys = key.split(".");

    let object = JSON.parse(localStorage.getItem(keys[0]));

    if (keys.length === 1) {
        return object;
    } else {
        keys.slice(1).forEach((key) => {
            object = object && object[key] ? object[key] : null;
        });
    }

    return object;
};

const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const getPropByPath=(obj, propString) =>{
    if (!propString)
        return obj;

    var prop, props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];

        var candidate = obj[prop];
        if (candidate !== undefined && candidate!=null ) {
            obj = candidate;
        } else {
            break;
        }
    }
    return obj[props[i]];
}


const func = {
    setCookie,
    getCookie,
    parseJwt,
    getKeyFromLS,
    capitalize,
    getPropByPath,
};

export default func;