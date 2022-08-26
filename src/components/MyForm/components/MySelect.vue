<template>
  <n-select :placeholder="f.placeholder" :options="data.options" />
</template>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const f = reactive(props.data);
</script>
