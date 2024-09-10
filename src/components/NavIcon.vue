<template>
  <NavTooltip :title="title">
    <div style="position: relative">
      <a class="icon-box" :href="href" :style="{ backgroundColor: bgColor }">
        <img
          :src="`/images/${imgUrl}`"
          :style="{ width: `${size}px`, height: `${size}px` }"
          alt=""
        />
      </a>
      <MinusCircleFilled
        class="del-icon"
        v-show="isEditingBookmark"
        @click="handleDelBtn(id as number)"
      />
    </div>
  </NavTooltip>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBookmarkStore } from '../store/bookmark'
import NavTooltip from './NavTooltip.vue'
import { MinusCircleFilled } from '@ant-design/icons-vue'

defineProps({
  id: {
    type: Number,
    require: true
  },
  title: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: '#fff'
  }
})

const bookmarkStore = useBookmarkStore()
const { isEditingBookmark, bookmarkList } = storeToRefs(bookmarkStore)
const { updateBookmarkList } = bookmarkStore

const handleDelBtn = (id: number) => {
  console.log(id)
  // 深拷贝
  const data = JSON.parse(JSON.stringify(bookmarkList.value))
  const resIdx = data.findIndex((item: any) => {
    return item.id === id
  })
  console.log(resIdx)
  if (resIdx !== -1) {
    data.splice(resIdx, 1)
    console.log(data)
    updateBookmarkList(data)
  }
}
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
.del-icon {
  position: absolute;
  right: -2px;
  top: -8px;
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    color: rgba(255, 255, 255, 0.2);
  }
  &:active {
    color: rgba(255, 255, 255, 0.3);
  }
}
</style>
