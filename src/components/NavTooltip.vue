<template>
  <Tooltip color="#fff" :title="title">
    <slot>default value</slot>
  </Tooltip>
</template>

<script setup lang="ts">
import { Tooltip } from 'ant-design-vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss">
.ant-tooltip-inner {
  color: #000 !important;
  line-height: 18px;
}
</style>
