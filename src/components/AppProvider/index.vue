<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-dialog-provider>
          <slot></slot>
          <global/>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts" >
</script>