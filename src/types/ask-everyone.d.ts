/**
 * 问答列表问题信息
 */
interface QuestionResponse {
  questionId: string
  itemId: string
  userId: string
  userName: string
  userAvatar: string | null
  questionDetails: string
  replyFlag: number
  answerCount: number
  showAnswerCount: number
  createTime: number
  updateTime: number
}
/**
 * 问答列表回答信息
 */
interface AnswerResponse {
  answerId: string
  questionId: string
  userId: string
  userName: string
  userAvatar: string | null
  replyType: number
  answerDetails: string
  createTime: number
  updateTime: number
}

/**
 * 问答列表
 */
interface QuestionItem {
  questionResponse: QuestionResponse
  answerResponseList: AnswerResponse[]
}
interface QuestionState {
  itemId: number
  title: string
  imgUrl: string
  total: number
}
