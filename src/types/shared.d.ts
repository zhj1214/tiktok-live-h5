/**
 * 将所有可枚举属性的值从一个源对象分配到目标对象,返回目标对象。
 * @param target 目标对象
 * @param origin 源对象
 * @param map 属性映射关系 { 目标对象属性: 源对象属性 }
 * @returns void
 */
interface PureAssignFunc {
  (target: AnyObject, origin: AnyObject, map?: AnyObject): AnyObject
}
