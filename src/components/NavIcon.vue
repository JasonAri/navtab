<template>
  <ContextMenu
    :menu="[{ label: '添加' }, { label: '编辑' }, { label: '删除' }]"
    @select="handleMenuSelect"
  >
    <NavTooltip :title="title">
      <div style="position: relative">
        <a class="icon-box" :href="href" :style="{ backgroundColor: bgColor }">
          <img
            :src="`${imgBaseUrl}${imgUrl}`"
            :style="{ width: `${size}px`, height: `${size}px` }"
            alt=""
          />
        </a>
      </div>
    </NavTooltip>
  </ContextMenu>
</template>

<script setup lang="ts">
import { useBookmarkStore } from '../store/bookmark'
import NavTooltip from './NavTooltip.vue'
import ContextMenu from './ContextMenu.vue'
import { message } from 'ant-design-vue'

const props = defineProps({
  id: {
    type: String,
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
    type: Number,
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

const imgBaseUrl = import.meta.env.VITE_APP_PROXY_TARGET + '/images'
const emit = defineEmits(['addOrEditBookmark'])

const bookmarkStore = useBookmarkStore()
const { delBookmarkById } = bookmarkStore

const handleMenuSelect = (item: { label: string }) => {
  switch (item.label) {
    case '添加':
      emit('addOrEditBookmark', undefined)
      break
    case '编辑':
      emit('addOrEditBookmark', props.id)
      break
    case '删除':
      delBookmarkById(props.id as string)
        .then((res) => {
          message.success('删除成功')
        })
        .catch((err) => {
          console.error(err)
          message.error('删除失败')
        })
      break

    default:
      break
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
