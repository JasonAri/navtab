<template>
  <div class="dock">
    <div class="dock-list">
      <NavIcon
        v-for="item in navIconList"
        :key="item.id"
        :imgUrl="item.imgUrl"
        :size="item.size"
        :href="item.href"
        :bgColor="item.bgColor"
        :title="item.title"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavIcon from './NavIcon.vue'
interface NavIconObj {
  id: string
  title: string
  imgUrl: string
  size: string
  href: string
  bgColor?: string
}
let navIconList: Array<NavIconObj> = [
  {
    id: '001',
    title: 'notion',
    imgUrl: 'icon-notion.svg',
    size: '48',
    href: 'https://www.notion.so/',
  },
  {
    id: '002',
    title: 'github',
    imgUrl: 'icon-github.com.svg',
    size: '38',
    href: 'https://github.com/',
  },
  {
    id: '003',
    title: '掘金',
    imgUrl: 'icon-juejin.cn.svg',
    size: '38',
    href: 'https://juejin.cn/',
  },
  {
    id: '004',
    title: 'bilibili',
    imgUrl: 'icon-bilibili.svg',
    size: '48',
    href: 'https://bilibili.com/',
  },
  {
    id: '005',
    title: 'AGE动漫',
    imgUrl: 'icon-agedm.org.ico',
    size: '62',
    href: 'https://www.agedm.org/',
  },
  {
    id: '006',
    title: '阿里云控制台',
    imgUrl: 'icon-aliyun.com.ico',
    size: '32',
    href: 'https://account.aliyun.com/login/login.htm?oauth_callback=https%3A%2F%2Fwww.aliyun.com%2F%3Fspm%3D5176.12901015-2.0.0.21174b84rt9cr6',
  },
  {
    id: '007',
    title: '宝塔面板',
    imgUrl: 'icon-bt.cn.ico',
    size: '32',
    href: 'http://8.134.202.12:23135/d9f7593b',
  },
  {
    id: '008',
    title: 'ChatGPT',
    imgUrl: 'icon-chatgpt.svg',
    size: '42',
    href: 'https://chatgpt.com/?oai-dm=1',
  },
  {
    id: '009',
    title: 'Perplexity',
    imgUrl: 'icon-perplexity.svg',
    size: '38',
    href: 'https://www.perplexity.ai/',
  },
  {
    id: '010',
    title: '通义千问',
    imgUrl: 'icon-tongyi.png',
    size: '38',
    href: 'https://tongyi.aliyun.com/qianwen/',
  },
  // {
  //   id: "999",
  //   imgUrl: "icon-add.png",
  //   size: "32",
  //   href: "https://www.baidu.com",
  // },
]
</script>

<style scoped lang="scss">
.dock {
  background-color: rgb(211, 211, 211, 0.5);
  min-width: 76px;
  height: 86px;
  position: absolute;
  text-align: center;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 26px;
  .dock-list {
    margin: 0 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-box {
      background-color: #fff;
      width: 60px;
      height: 60px;
      margin: 0 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
