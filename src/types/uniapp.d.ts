declare module 'UniApp' {
  interface EventHandle {
    detail: { current: number; source?: any }
    [key: string]: any
  }
}

interface ScrollEvent {
  detail: {
    scrollTop: number
  }
  [key: string]: any
}
