module.exports = async (obj, type, id, listArr, currentUserId) => {
  console.log(id)
  const info = {}
  if (obj === 'tweets') {
    info.objection = obj
    info.type = type
    info.tweetId = id
  }

  if (obj === 'users') {
    info.objection = obj
    info.type = type
    info.userId = id
  }

  return {
    info: info,
    SubscribersList: listArr,
    userId: currentUserId
  }
}
