const makeKebabCase = function (input) {
    const regIsNotLetterOrDigit = /[^0-9a-zA-Z]+/g;
    const regIsNotLetterOrDigitAtEnds = /(^[^0-9a-zA-Z]+)|([^0-9a-zA-Z]+$)/g;
    const regUppercaseFollowingLowercase = /([a-z])([A-Z])/g;

    return input
        .replace(regUppercaseFollowingLowercase, "$1-$2")
        .replace(regIsNotLetterOrDigitAtEnds, "")
        .replace(regIsNotLetterOrDigit, "-")
        .toLowerCase();
};

const formatDateString = function (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default {
    makeKebabCase,
    formatDateString,
};
