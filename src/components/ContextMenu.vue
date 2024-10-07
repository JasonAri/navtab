<template>
  <div class="container" ref="containerRef" id="cm">
    <slot></slot>
    <Teleport to="body">
      <div
        class="context-menu"
        v-if="visible"
        :style="{ left: x + 'px', top: y - (16 + 32 * 3) + 'px' }"
      >
        <div class="menu-list">
          <div
            @click="handleClick(item)"
            class="menu-item"
            v-for="item in menu"
            :key="item.label"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useContextMenu from '../hooks/useContextMenu'

const emit = defineEmits(['select'])
defineProps({
  menu: {
    type: Array<{ label: string }>,
    require: true
  }
})
const containerRef = ref<HTMLElement | null>(null)
const { x, y, visible } = useContextMenu(containerRef)
const handleClick = (item: object) => {
  visible.value = false
  emit('select', item)
}
</script>

<style scoped lang="scss">
.context-menu {
  width: 80px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  z-index: 99;
  box-shadow: 2px 2px 1px #eee;
}
.menu-list {
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  margin: 8px 0;
}
.menu-item:hover {
  background-color: #eee;
}
</style>
