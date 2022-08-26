<template>
  <n-input
    :name="f.name"
    v-model:value="f.value"
    :placeholder="f.placeholder"
  />
</template>

<script setup lang="ts">
import { reactive } from "vue"

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
})

const f = reactive(props.data)
</script>
