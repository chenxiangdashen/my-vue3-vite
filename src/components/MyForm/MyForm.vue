<template>
  <n-form
    ref="formRef"
    :label-width="80"
    label-placement="left"
    :model="formValue"
    size="large"
  >
    <n-grid :cols="3">
      <n-gi v-for="i in f" :key="i.name">
        <n-form-item :label="i.label">
          <component :is="componentsMap[i.type]" :data="i"></component>
        </n-form-item>
      </n-gi>
    </n-grid>

    <n-grid :cols="3">
      <n-gi>
        <n-space justify="start">
          <p v-for="(item, index) in btn" :key="index">
            <n-button :type="item.type" @click="item.click"
              >{{ item.title }}
            </n-button>
          </p>
        </n-space>
      </n-gi>
      <n-gi>
        <n-form-item> </n-form-item>
      </n-gi>
      <n-gi>
        <n-space justify="end">
          <n-button type="primary" @click="search">搜索</n-button>
          <n-button @click="reset">重置</n-button>
        </n-space>
      </n-gi>
    </n-grid>
  </n-form>
</template>


<script setup lang="ts">
import { defineProps, reactive, defineEmits } from "vue";
import _ from "lodash";
import { IFormProps, IFormState } from "./MyForm";
import MyInput from "./components/MyInput.vue";
import MySelect from "./components/MySelect.vue";
// ComponentPublicInstanceConstructor
const componentsMap: any = {
  MyInput,
  MySelect,
};

type FormData = IFormProps[];

interface FormValue {
  formData: FormData;
  btnFun: any[];
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
const btn = reactive([...formProps.btnFun]);
const search = (e: any) => {
  const state: IFormState = {
    formData: f.reduce((acc: IFormState, cur: IFormProps) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {}),
  };
  emit("onSearch", state);
};
const reset = () => {
  f.forEach((i, index) => {
    i.value = oldFormProps.formData[index].value;
  });
};
</script>