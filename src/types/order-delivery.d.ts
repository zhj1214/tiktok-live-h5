/**
 * 物流详情类型声明
 * @property state 物流状态
 * @property Traces 物流详情
 */
interface LogisticsDetailInfo {
  state: string
  traces: TraceInfo[]
}

interface TraceInfo {
  acceptStation: string
  acceptTime: string
}
