<template></template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const { currentRoute, replace } = useRouter();

const { query } = currentRoute.value;
let redirect = query?.redirect;
Reflect.deleteProperty(query, "redirect");

if (Array.isArray(redirect)) {
  redirect = redirect.join("/");
}
if (redirect?.startsWith("/redirect")) {
  redirect = "/";
}

replace({
  path: redirect?.startsWith("/") ? redirect : "/" + redirect,
  query,
});
</script>
