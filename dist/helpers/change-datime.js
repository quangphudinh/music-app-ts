"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeDatime = void 0;
const changeDatime = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
};
exports.changeDatime = changeDatime;
