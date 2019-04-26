const mongo = require('./mongo')
const logger = require('./logger')

module.exports = key => {
  return new Promise(async (resolve, reject) => {
    const db = await mongo()
    const items = db.collection(process.env.MONGODB_COLLECTION)
    items.findOne({ key: key }, (error, document) => {
      if (error) {
        logger('error', ['get-from-storage', 'key', key, error])
        return resolve(false)
      } else {
        console.log(document)
        logger('info', ['get-from-storage', 'key', key, 'success'])
        return resolve(document)
      }
    })
  })
}
