import 'vue'
declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}

// vue全局注册方法声明
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {}
// }
