<template>
  <n-form
    ref="formRef"
    :label-width="80"
    label-placement="left"
    :model="formValue"
    size="large"
  >
    <n-grid :x-gap="12" :y-gap="8" :cols="3">
      <n-gi v-for="i in f" :key="i.name">
        <n-form-item :label="i.label">
          <n-input
            :name="i.name"
            v-model:value="i.value"
            :placeholder="i.placeholder"
          />
        </n-form-item>
      </n-gi>
    </n-grid>

    <n-grid>
      <n-grid-item>
        <n-button type="primary" @click="search">搜索</n-button>
        <n-button @click="reset">重置</n-button>
      </n-grid-item>
    </n-grid>
  </n-form>
</template>


<script setup lang="ts">
import { defineProps, reactive, defineEmits } from "vue";
import _ from "lodash";
import { FormInst, useMessage } from "naive-ui";
import { IFormProps, IFormState } from "./MyForm";

type FormData = IFormProps[];

interface FormValue {
  formData: FormData;
}

const formProps = defineProps<FormValue>();
const formValue: IFormState = {};

// 基于类型
const emit = defineEmits<{
  (e: "onSearch", state: IFormState): void;
  (e: "update", value: string): void;
}>();

const oldFormProps = _.cloneDeep(formProps);
const f = reactive([...formProps.formData]);

const search = (e: any) => {
  console.log(f);
  const state: IFormState = {
    formData: f.reduce((acc: IFormState, cur: IFormProps) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {}),
  };
  console.log(formValue);
  emit("onSearch", state);
};
const reset = () => {
  console.log(oldFormProps.formData);
  f.forEach((i, index) => {
    i.value = oldFormProps.formData[index].value;
  });
};
console.log(f);
</script>