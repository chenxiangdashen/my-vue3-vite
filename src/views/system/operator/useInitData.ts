import { h, ref, reactive } from "vue";
import { NButton, NSwitch } from "naive-ui";

export const useInitData = () => {
  // refs
  const columns = ref([]);

  function initColumns() {
    columns.value = [
      { type: "selection" },
      { title: "用户名", key: "USER_ID", width: 80 },
      { title: "姓名", key: "FULL_NAME", width: 80 },
      { title: "用户状态", key: "STATUS_ZH", width: 80 },
      { title: "电话", key: "MOBILE_HIDE", width: 120 },
      { title: "邮箱地址", key: "EMAIL", width: 120 },

      {
        title: "操作",
        key: "actions",
        width: 120,
        align: "center",
        fixed: "right",
        render(row) {
          return [
            h(
              NButton,
              {
                size: "small",
                type: "error",
                style: "margin-left: 15px;",
              },
              { default: () => "删除" }
            ),
          ];
        },
      },
    ];
  }
  return {
    columns,
    initColumns,
  };
};
