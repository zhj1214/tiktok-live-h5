/*
 * @Description: 问卷调查模型
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-04-07 11:14:04
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-04-28 20:16:19
 */
interface SurveyAnswer {
  option: mumber
  content: string
}
interface SurveySelectValue {
  value: string // id值
  name: string
  order: string // 题号
  desc?: string // 说明
  chooseType?: boolean // 1单选  2多选
  required: boolean // 子选项是不是必填
  // selectShow: boolean // 是否默认显示说明字段
  isRadio?: boolean // 是不是单选，不是单选就是多选
  rate?: number // 几颗星星
  scoreValue?: number // 进度条值
  pictureUrl?: string // 是不是有图片，子项没有图片
  filled?: boolean // 是否显示输入框
  inputText?: string // 输入框的内容
  content?: string // 输入框的内容
  min?: number // 多选时：最少选几项  如果是评价输入框：代表最少多少字
  max?: number // 多选时：最多选几项
  subitems?: SurveySelectValue[] // 是否有子项选择
  values?: [] // 子选项选择的结果
  answer?: SurveyAnswer[]
}

interface SurveyItem {
  id: string
  name: string
  order: string // 题号
  idx?: number // 索引值
  isHide?: boolean // 是否隐藏题目
  required: boolean // 是不是必填
  type: number // 题型（1单选 2多选 3问答 4评星 5评分）

  isRadio?: boolean // 是不是单选，不是单选就是多选
  israte?: boolean // 是否展示评星
  rate?: number // 评分值
  rates?: SurveySelectValue[] // 评分后的选择

  isScore?: boolean // 是否展打分组件
  scoreValue?: number // 打分值
  scores?: SurveySelectValue[] // 打分以后的选项

  isEvaluate?: boolean // 是否显示评价组件
  evaluate?: string // 评价内容
  min?: number // 多选时：最少选几项
  max?: number // 多选时：最多选几项  如果是评价输入框：代表最多多少字

  options?: SurveySelectValue[]
  values?: []
  answer?: SurveyAnswer[]
  rules?: AnyObject
}

interface OptionsSurvey {
  id?: string
  type: string
  longId?: string
  shortId?: string
  chaseId?: string
}
