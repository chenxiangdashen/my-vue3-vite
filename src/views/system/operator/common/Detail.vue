<template>
  <n-form
    pt20
    ref="formRef"
    :rules="rules"
    :model="formData"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item path="USER_ID" label="用户名">
      <n-input
        :disabled="props.rowType === 'edit'"
        placeholder="请输入"
        v-model:value="formData.USER_ID"
      ></n-input>
    </n-form-item>
    <n-form-item label="姓名" path="FULL_NAME">
      <n-input
        placeholder="请输入"
        v-model:value="formData.FULL_NAME"
      ></n-input>
    </n-form-item>
    <n-form-item label="邮箱" path="EMAIL">
      <n-input placeholder="请输入" v-model:value="formData.EMAIL"></n-input>
    </n-form-item>
    <n-form-item label="电话" path="MOBILE">
      <n-input placeholder="请输入" v-model:value="formData.MOBILE"></n-input>
    </n-form-item>
  </n-form>

  <n-space justify="end">
    <n-button @click="onCancel">取消</n-button>
    <n-button type="primary" @click="onSure">确定</n-button>
  </n-space>
</template>

<script setup lang="ts">
// defineProps({});

import { IReqUserInfo } from "@/api/types/user"
import { validateEmail, validatePhoneNumber } from "@/utils/validate"
import { FormInst, FormItemRule } from "naive-ui"
import { FormRules } from "naive-ui/lib"
import { InternalRowData } from "naive-ui/lib/data-table/src/interface"
import { Ref, ref, defineEmits, watch } from "vue"

const formRef = ref<FormInst | null>(null)
interface IRowData {
  rowData: InternalRowData
  rowType: "add" | "edit"
}

const props = defineProps<IRowData>()

const formData: Ref<IReqUserInfo> =
  props.rowType === "add"
    ? ref({
        USER_ID: "",
        FULL_NAME: "",
        EMAIL: "",
        MOBILE: "",
      })
    : ref({
        ...(props.rowData as IReqUserInfo),
      })

watch(
  () => props.rowData,
  (pre, old) => {
    console.log(pre, old)
  },
  { deep: true }
)
console.log("props.rowdata", props.rowData)
const rules: FormRules = {
  USER_ID: {
    required: true,
    trigger: ["input"],
    message: "请输入用户名",
  },
  FULL_NAME: {
    required: true,
    trigger: ["input"],
    message: "请输入姓名",
  },
  EMAIL: {
    required: true,
    trigger: ["input"],
    validator(rule: FormItemRule, value: string) {
      if (value === "") {
        return Error("请输入邮箱")
      }
      return validateEmail(value)
    },
  },
  MOBILE: {
    required: true,
    trigger: ["input"],
    validator(rule: FormItemRule, value: string) {
      if (value === "") {
        return Error("请输入手机号码")
      }
      return validatePhoneNumber(value)
    },
  },
}

const emit = defineEmits<{
  (e: "onCancel", state: any): void
  (e: "onSure", state: IReqUserInfo): void
}>()

const onCancel = () => {
  formData.value = {
    USER_ID: "",
    FULL_NAME: "",
    EMAIL: "",
    MOBILE: "",
  }
  emit("onCancel", {})
}

const onSure = () => {
  formRef.value?.validate((error) => {
    console.log(error)
    if (!error) {
      emit("onSure", formData.value)
    }
  })
}
</script>
