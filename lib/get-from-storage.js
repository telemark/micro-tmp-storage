const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async key => {
  const db = await mongo()
  const items = db.collection(process.env.MONGODB_COLLECTION)
  return new Promise((resolve, reject) => {
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
