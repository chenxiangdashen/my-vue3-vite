import type { DialogOptions } from "naive-ui/lib/dialog"

export interface ModalMethods {
  setProps: (props) => void
  openModal: () => void
  closeModal: () => void
  setSubLoading: (status) => void
}

export type ModalProps = DialogOptions

export type RegisterFn = (ModalInstance: ModalMethods) => void

export type UseModalReturnType = [RegisterFn, ModalMethods]
