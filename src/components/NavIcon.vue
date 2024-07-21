<template>
  <NavTooltip :title="title">
    <a class="icon-box" :href="href" :style="{ backgroundColor: bgColor }">
      <img
        :src="`/images/${imgUrl}`"
        :style="{ width: `${size}px`, height: `${size}px` }"
        alt=""
      />
    </a>
  </NavTooltip>
</template>

<script setup lang="ts">
import NavTooltip from './NavTooltip.vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: '#fff',
  },
})

// const props = withDefaults(defineProps<NavIcon>(), {
//   src: "icon-add.png",
//   size: "32",
// });
</script>

<style scoped lang="scss">
.icon-box {
  width: 60px;
  height: 60px;
  margin: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
}
</style>
