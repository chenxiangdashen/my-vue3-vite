<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="item in currentRoute.matched"
      :key="item.path"
      @click="handleBreadClick(item.path)"
    >
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { router } from "@/router";
const { currentRoute } = router;

function handleBreadClick(path: string) {
  if (path === currentRoute.value.path) return;
  router.push(path);
}
</script>
