module.exports = class {
    static log(...args) {
        console.log(new Date().toLocaleString(), args)
    }
}