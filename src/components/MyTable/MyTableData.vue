<template>
  <n-data-table
    mt-20
    remote
    :loading="myTable.loading.value"
    :scroll-x="1600"
    :data="myTable.tableData.value"
    :columns="columns"
    :pagination="myTable.paginationReactive || {}"
    :row-key="(row:any) => row[rowKey]"
    @update:page="onPageChange"
    @update:page-size="onPageSizeChange"
  />
  <!-- <div><a href="a">a</a></div> -->
</template>

<script setup lang="ts">
import { defineProps, onMounted, watch } from "vue";
import type { DataTableColumns } from "naive-ui";
import MyTable, { ITable } from "./MyTableData";

export interface ITableProps {
  columns: DataTableColumns;
  rowKey: string;
  url: string;
  searchParams: any;
}

const props = defineProps<ITableProps>();
const options: ITable = {
  url: props.url,
  _searchParams: props.searchParams,
};

const myTable = new MyTable(options);
function onPageChange(page: number) {
  myTable.onPageChange(page);
}
function onPageSizeChange(pageSize: number) {
  myTable.onPageSizeChange(pageSize);
}
onMounted(() => {
  myTable.getData();
});

watch(
  () => props.searchParams,
  (params: { value: any }) => {
    /* ... */
    myTable.searchParams = params.value;
    myTable.getData();
  }
);
</script>