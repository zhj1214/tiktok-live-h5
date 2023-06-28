type Hooks = Page.PageInstance
interface PageCustomOptions extends Hooks {
  $page: {
    fullPath: string
  }
}
