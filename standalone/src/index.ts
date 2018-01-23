(function () {
    var Vue = require('vue')
    if (!Vue) {
        var message = 'Vue not installed'
        alert(message)
        throw new Error(message)
    }
    Vue.use(require('../../src'))
})()