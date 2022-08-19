import type { DataTableColumns } from "naive-ui";
import { h, ref, reactive, Ref } from "vue";
import request from "../../service/index";
import { parseResponse } from "../../utils/index";

const paginationReactive = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  pageSizes: [
    {
      label: "10 每页",
      value: 10,
    },
    {
      label: "20 每页",
      value: 20,
    },
    {
      label: "30 每页",
      value: 30,
    },
    {
      label: "50 每页",
      value: 50,
    },
  ],
  showSizePicker: true,
  itemCount: 0,
});

export interface ITable {
  page: number;
  pageSize?: number;
  url: string;
  _searchParams?: any;
}

class MyTable implements ITable {
  page: number;
  pageSize?: number;
  url: string;
  _searchParams?: any;

  public loading = ref(null);
  public paginationReactive = paginationReactive;
  public tableData = ref([]);
  constructor(options: ITable) {
    this.page = 1;
    this.pageSize = options.pageSize || 10;
    this.url = options.url;
    this._searchParams = options._searchParams;
  }

  // set searchParams(params: any) {
  //   this._searchParams = params;
  // }

  async getData(currentPage: number = 1) {
    this.loading.value = true;
    const result = await request({
      url: this.url,
      method: "get",
      data: {
        ...this._searchParams,
        currentPage,
        pageSize: this.pageSize,
      },
    });
    const data = parseResponse(result);
    if (result.code === 200) {
      this.tableData.value = data.list;
      this.paginationReactive.page = currentPage;
      this.paginationReactive.itemCount = data.total;
      this.paginationReactive.pageCount = Math.ceil(data.total / this.pageSize);
      this.paginationReactive.pageSize = this.pageSize;
      this.loading.value = false;
    }
  }
  onPageChange(page: number) {
    this.getData(page);
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.getData(1);
  }
}

export default MyTable;

export {};
