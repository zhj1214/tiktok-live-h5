/**
 * 全局接口定义
 */
declare module '$dayjs'

// 空函数类型
type Fn = () => void

type Fn<T> = (T) => void

// promise resolve 函数类型
type ResolveFn = (value: unknown) => void

/**
 * 商品支付类型
 * 1：现金支付
 * 2：积分支付
 * 3：定额积分+现金
 * 4：自由积分
 */
type PayType = 1 | 2 | 3 | 4

/**
 * 动态获取图片地址
 */
interface GeneratorDynamicPicFunc<T> {
  (name: T): T
}

interface PageListInfo<T> {
  data: T[]
  total: number
}

interface HTMLEvent {
  detail?: HTMLInputElement
  target: HTMLInputElement
}

const jWeixin: JWeixin

type DebounceFn<T> = (fn: Fn<T>, wait?: number, immediate?: boolean) => (T) => void
