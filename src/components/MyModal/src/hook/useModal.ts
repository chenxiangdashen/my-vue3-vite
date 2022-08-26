import { getCurrentInstance, ref, unref, watch } from "vue"
import { ModalMethods, UseModalReturnType } from "../type/index"

export function useModal(props): UseModalReturnType {
  const modalRef = ref<Nullable<ModalMethods>>(null)
  const currentInstance = getCurrentInstance()

  const getInstance = () => {
    const instance = unref(modalRef.value)
    if (!instance) {
      return
    }
    return instance
  }

  const register = (modalMethod: ModalMethods) => {
    modalRef.value = modalMethod
    currentInstance?.emit("register", modalMethod)

    watch(
      () => props,
      () => {
        props && modalMethod.setProps(props)
      },
      {
        deep: true,
        immediate: true,
      }
    )
  }

  const method: ModalMethods = {
    setProps: (props): void => {
      getInstance()?.setProps(props)
    },
    openModal: (): void => {
      getInstance()?.openModal()
    },
    closeModal: (): void => {
      getInstance()?.closeModal()
    },
    setSubLoading: (status): void => {
      getInstance()?.setSubLoading(status)
    },
  }

  return [register, method]
}
