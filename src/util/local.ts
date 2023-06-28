/*
 * @Description: 本地存储工具类
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-04-18 11:07:58
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-04-28 14:51:59
 */

const EXPIRETIMEKEY = 'expireTimeKey_1214'

/**
 * @description: 存储值到本地
 * @param {string} key
 * @param {any} val 要存储的对象
 * @param {number} expireTime 过期时间
 * @author: zhj1214
 */
export const setItem = function (key: string, val: any, expireTime?: number) {
  try {
    uni.setStorageSync(key, JSON.stringify(val))
    if (expireTime) {
      let keyArr = getItem(EXPIRETIMEKEY)
      if (!keyArr) {
        keyArr = []
      }
      keyArr.push({
        key: key,
        expireTime: new Date().getTime() + expireTime
      })
      uni.setStorageSync(EXPIRETIMEKEY, JSON.stringify(keyArr))
    }
  } catch (e) {
    uni.setStorageSync(key, '')
  }
}
/**
 * @description: 从本地取值
 * @param {string} key
 * @author: zhj1214
 */
export const getItem = function (key: string): any {
  try {
    let value = uni.getStorageSync(key)
    value = JSON.parse(value)
    return value || []
  } catch (e) {
    return []
  }
}

/**
 * @description: 删除本地某个key值
 * @param {string} key
 * @author: zhj1214
 */
export const remove = function (key: string) {
  uni.removeStorage({
    key: key,
    success() {
      console.log('删除本地缓存___' + key)
    }
  })
}

/**
 * @description:  清楚本地过期的缓存数据
 * @author: zhj1214
 */
export const runExpireTime = function () {
  const keyArr = getItem(EXPIRETIMEKEY)
  if (keyArr && keyArr.length > 0) {
    const curTime = new Date().getTime()
    const newArr =
      keyArr.filter((element: AnyObject) => {
        const isDelete = element.expireTime <= curTime
        if (isDelete) {
          remove(element.key)
        }
        return !isDelete
      }) || []
    setItem(EXPIRETIMEKEY, newArr)
  }
}
runExpireTime()

/****************** 用于保存当前用户相关信息 val 新增属性，或者修改原属性 ******************/
// export const setCurrentUser = function (val) {
//   const user = this.getItem('wxUserInfo')
//   const obj = { ...user, ...val }
//   this.setItem('wxUserInfo', obj)
//   if (obj.memberIdStr || obj.memberId) this.setItem('memberId', obj.memberIdStr || obj.memberId)
//   if (obj.organizationId) this.setItem('userOrgId', obj.organizationId)
// }

// export const getCurrentUser = function () {
//   return this.getItem('wxUserInfo')
// }

// export const removeCurrentUserKey = function (key) {
//   const user = this.getItem('wxUserInfo')
//   delete user[key]
//   this.setItem('wxUserInfo', user)
// }
