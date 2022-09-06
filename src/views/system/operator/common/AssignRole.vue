<template>
  <n-space justify="center">
    <n-transfer
      ref="transfer"
      v-model:value="getBindValue.value"
      :options="getBindValue.option"
      source-filterable
      source-title="未选权限"
      target-title="已选权限"
    />
  </n-space>
  <n-space justify="end" mt30>
    <n-button @click="onCancel">取消</n-button>
    <n-button type="primary" @click="onSure">确定</n-button>
  </n-space>
</template>
<script setup lang="ts">
import { Option } from "naive-ui/lib/transfer/src/interface"
import { ref, defineProps, Ref, watch } from "vue"

export interface ITransferProps {
  option: Option[]
  value: string[] | number[]
  userId: string
}

const props = defineProps<ITransferProps>()
const getBindValue: Ref<ITransferProps> = ref({
  value: [],
  option: [],
  userId: "",
})
watch(
  () => props,
  (params, preParams) => {
    /* ... */
    getBindValue.value = params
  },
  { deep: true }
)

const emit = defineEmits<{
  (e: "onCancel", state: any): void
  (e: "onSure", state: any): void
}>()

const onCancel = () => {
  emit("onCancel", {})
}

const onSure = () => {
  emit("onSure", {
    ROLE_IDS: getBindValue.value.value.join(","),
    USER_ID: getBindValue.value.userId,
  })
}
</script>
