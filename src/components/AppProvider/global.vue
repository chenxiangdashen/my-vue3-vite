<template></template>

<script lang="ts" setup>
import { useDialog, useMessage, useLoadingBar } from "naive-ui"
window.$message = useMessage()
window.$dialog = useDialog()
window.$loadingBar = useLoadingBar()
</script>
