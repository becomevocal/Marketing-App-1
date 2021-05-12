const { environment } = require('@rails/webpacker')
const localesConfig = require('./rules/locales')

environment.loaders.insert('po', localesConfig)

module.exports = environment
