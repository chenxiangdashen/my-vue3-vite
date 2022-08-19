<template>
  <div p24>
    <MyForm :form-data="formData" @on-search="onSearch" />
    <MyTableData
      row-key="USER_ID"
      :searchParams="searchParams"
      :columns="columns"
      url="/auth/user/qryList"
    />
  </div>
</template>

<script setup lang="ts">
import { useInitData } from "./useInitData";
import { onMounted, reactive, ref } from "vue";
import { IFormProps, IFormState } from "@/components/MyForm/MyForm";
const { columns, initColumns } = useInitData();

let searchParams = ref({});

const formData: IFormProps[] = [
  {
    label: "用户名",
    name: "USER_ID",
    placeholder: "请输入用户名",
    value: "",
  },
  {
    label: "姓名",
    name: "FULL_NAME",
    placeholder: "输入姓名",
    value: "",
  },
];

const onSearch = (state: IFormState) => {
  searchParams.value = state.formData;
};

onMounted(() => {
  initColumns();
  console.log(columns);
});
</script>

<style lang="scss" scoped>
.action-btns {
  display: flex;
}
</style>
