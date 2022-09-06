<template>
  <div p24>
    <MyForm :btn-fun="btnList" :form-data="formData" @on-search="onSearch" />
    <MyTable
      row-key="USER_ID"
      :searchParams="searchParams"
      :columns="columns"
      url="/auth/user/qryList"
    />
    <MyModal
      @register="addModalRegister"
      ref="modalRef"
      class="basicModal"
      style="width: 450px"
    >
      <AddVue
        @on-cancel="onCancel"
        @on-sure="onSure"
        :row-data="rowData"
        :row-type="rowType"
      ></AddVue>
    </MyModal>

    <MyModal
      @register="addModalRegister"
      ref="modalRef"
      class="basicModal"
      style="width: 450px"
    >
      <AddVue
        @on-cancel="onCancel"
        @on-sure="onSure"
        :row-data="rowData"
        :row-type="rowType"
      ></AddVue>
    </MyModal>

    <MyModal
      @register="assignRoleModalRegister"
      ref="assignRoleRef"
      class="basicModal"
      style="width: 800px"
    >
      <AssignRole
        :option="assignRoleProps.option"
        :value="assignRoleProps.value"
        :user-id="assignRoleProps.userId"
        @on-cancel="onAssignRoleCancel"
        @on-sure="onAssignRoleSure"
      ></AssignRole>
    </MyModal>
  </div>
</template>

<script setup lang="ts">
// import { useInitData } from "./useInitData";
import { onMounted, h, ref, Ref, unref, reactive } from "vue"
import { IFormProps, IFormState } from "@/components/MyForm/MyForm"
import { DataTableColumns, NButton } from "naive-ui"
import { InternalRowData } from "naive-ui/lib/data-table/src/interface"
import { IModalProps } from "@/components/MyModal/MyModal"
import AddVue from "./common/Add.vue"
import AssignRole, { ITransferProps } from "./common/AssignRole.vue"
import { IReqUserInfo } from "@/api/types/user"
import { useUserStore } from "@/store/modules/user"
import { useModal } from "@/components/MyModal"

// const { columns, initColumns } = useInitData();

const userStore = useUserStore()

const [addModalRegister, { openModal, closeModal, setSubLoading, setProps }] =
  useModal({
    title: "新增操作员",
    maskClosable: true,
  })

const [assignRoleModalRegister, assignRoleModalMethods] = useModal({
  title: "分配角色",
  maskClosable: true,
})
const assignRoleProps: Ref<ITransferProps> = ref({
  value: [],
  option: [],
  userId: "",
})

const rowData = ref({})
const rowType: Ref<"add" | "edit"> = ref("add")

const columns: DataTableColumns = [
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
    render(r: InternalRowData, index) {
      return [
        h(
          NButton,
          {
            tag: "a",
            text: true,
            type: "primary",
            style: "margin-left: 15px;",
            onClick: () => {
              setProps({ title: "修改" })
              rowData.value = r
              rowType.value = "edit"
              openModal()
            },
          },
          { default: () => "修改" }
        ),
        h(
          NButton,
          {
            tag: "a",
            text: true,
            size: "small",
            type: "warning",
            style: "margin-left: 15px;",
            onClick: () => {},
          },
          { default: () => "详情" }
        ),
        h(
          NButton,
          {
            tag: "a",
            text: true,
            type: "warning",
            style: "margin-left: 15px;",
          },
          { default: () => "删除" }
        ),
        h(
          NButton,
          {
            tag: "a",
            text: true,
            type: "primary",
            style: "margin-left: 15px;",
            onClick: async () => {
              console.log("-----click")
              window.$loadingBar.start()
              assignRoleModalMethods.openModal()
              const data = await userStore.getUserRolesInfo(unref(rowData))
              if (data) {
                assignRoleProps.value.userId = data.USER_ID
                assignRoleProps.value.value = data.USR_CURR_ROLE_ID_LIST
                assignRoleProps.value.option = data.ALL_ROLE_LIST.map(
                  (item: any) => {
                    return {
                      value: item.roleId,
                      label: item.roleId,
                    }
                  }
                )

                window.$loadingBar.finish()
              }
            },
          },
          { default: () => "分配角色" }
        ),
      ]
    },
  },
]

const searchParams = ref({})

const btnList: any[] = [
  {
    title: "新增",
    type: "primary",
    hidden: false,
    action: "add",
    click: () => {
      rowType.value = "add"
      setProps({ title: "新增操作员" })
      openModal()
      setSubLoading(true)
    },
  },
]

const modalProps: Ref<IModalProps> = ref({
  show: false,
  title: "测试",
  width: "500px",
})

const onCancel = () => {
  // console.log(modalProps.value.show);
  closeModal()
}

const onSure = (e: IReqUserInfo) => {
  userStore.addUserInfo(e)
  console.log(e)
}

const onAssignRoleCancel = () => {
  // console.log(modalProps.value.show);
  assignRoleModalMethods.closeModal()
}

const onAssignRoleSure = async (e: any) => {
  const res = await userStore.updateUserRoles({ ...e })
  if (res) {
    assignRoleModalMethods.closeModal()
  }
}

const formData: IFormProps[] = [
  {
    label: "用户名",
    name: "USER_ID",
    placeholder: "请输入用户名",
    value: "",
    type: "MyInput",
  },
  {
    label: "姓名",
    name: "FULL_NAME",
    placeholder: "输入姓名",
    value: "",
    type: "MyInput",
  },
  {
    label: "状态",
    name: "STATUS",
    placeholder: "请选择",
    value: "",
    type: "MySelect",
    options: [
      {
        label: "全部",
        value: "",
      },
      {
        label: "Drive My Car",
        value: "song1",
      },
      {
        label: "Norwegian Wood",
        value: "song2",
      },
    ],
  },
]

const onSearch = (state: IFormState) => {
  searchParams.value = state.formData
  console.log(searchParams)
}

// onMounted(() => {
//   initColumns();
//   console.log(columns);
// });
</script>

<style lang="scss" scoped>
.action-btns {
  display: flex;
}
</style>
