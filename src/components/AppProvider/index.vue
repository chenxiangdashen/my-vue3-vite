<template>
  <n-config-provider :theme-overrides="useTheme.theme" style="height: 100vh">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <slot></slot>
          <global />
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts" >
import { useThemeStore } from "@/store/modules/theme";
import { darkTheme } from "naive-ui";

const useTheme = useThemeStore();
</script>