<template>
  <div :id="props.id" />
</template>

<script lang="ts" setup>
import { onMounted, defineProps, withDefaults } from "vue";

export interface Props {
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: "cooljs-main-container",
});

onMounted(async () => {
  console.info("cool.js mounted ...");
  const js = await fetch("https://cooljs.io/api/v1/render/p")
    .then(async (resp) => await resp.text())
    .catch((e) => {
      console.error(e);
    });
  if (js) {
    const fn = new Function(js);
    fn();
  } else {
    console.error("cool.js not loaded ...");
  }
});
</script>

<style scoped></style>
