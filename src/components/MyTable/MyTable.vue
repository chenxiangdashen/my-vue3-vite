<template>
  <n-data-table
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
import { defineProps, onMounted, watch, ref } from "vue"
import type { DataTableColumns } from "naive-ui"
import MyTable, { ITable } from "./MyTable"
import { cleanObj } from "@/utils/index"

export interface ITableProps {
  columns: DataTableColumns
  rowKey: string
  url: string
  searchParams: any
}

const props = defineProps<ITableProps>()
const options: ITable = {
  page: 1,
  url: props.url,
  searchParams: props.searchParams,
}

const myTable = new MyTable(options)
function onPageChange(page: number) {
  myTable.onPageChange(page)
}
function onPageSizeChange(pageSize: number) {
  myTable.onPageSizeChange(pageSize)
}
onMounted(() => {
  myTable.getData()
})

watch(
  () => props.searchParams,
  (params, preParams) => {
    /* ... */
    myTable.searchParams = cleanObj(Object.assign({}, params))
    myTable.getData()
  },
  { deep: true }
)
</script>
