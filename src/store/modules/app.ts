import { defineStore } from "pinia"
import { nextTick } from "vue"

export const useAppStore = defineStore("app", {
  state() {
    return {
      reloadFlag: true,
      collapsed: false,
    }
  },
  actions: {
    async reloadPage() {
      window.$loadingBar.start()
      this.reloadFlag = false
      await nextTick()
      this.reloadFlag = true

      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 })
        window.$loadingBar.finish()
      }, 100)
    },
    switchCollapsed() {
      this.collapsed = !this.collapsed
    },
    setCollapsed(collapsed) {
      this.collapsed = collapsed
    },
  },
})
