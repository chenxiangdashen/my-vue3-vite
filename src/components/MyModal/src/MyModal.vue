<template>
  <n-modal
    id="basic-modal"
    v-bind="getBindValue"
    v-model:show="isModal"
    @close="onCloseModal"
  >
    <template #header>
      <div class="w-full cursor-move" id="basic-modal-bar">
        {{ getBindValue.title }}
      </div>
    </template>
    <template #default> <slot name="default"></slot> </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity"
import { ModalProps } from "naive-ui"
import { getCurrentInstance, ref, unref, useAttrs } from "vue"
import { basicProps } from "./props"
import { ModalMethods } from "./type"
import { deepMerge } from "@/utils/index"

const attrs = useAttrs()
const props = defineProps({ ...basicProps })
const emit = defineEmits(["on-close", "on-sure", "register"])

const propsRef = ref<Partial<ModalProps> | null>(null)

const isModal = ref(false)
const subLoading = ref(false)
console.log(propsRef)

const getBindValue = computed(() => {
  return {
    ...attrs,
    ...props,
    ...unref(propsRef),
  }
})

async function setProps(modalProps: Partial<ModalProps>): Promise<void> {
  propsRef.value = deepMerge(unref(propsRef) || ({} as any), modalProps)
}

function setSubLoading(status: boolean) {
  subLoading.value = status
}

const openModal = () => {
  isModal.value = true
}

const closeModal = () => {
  isModal.value = false
}

const modalMethods: ModalMethods = {
  setProps,
  openModal,
  closeModal,
  setSubLoading,
}
function onCloseModal() {
  isModal.value = false
  emit("on-close")
}

const instance = getCurrentInstance()
if (instance) {
  console.log("register", modalMethods)
  emit("register", modalMethods)
}
</script>
