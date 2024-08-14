<template>
  <Result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <RouterLink to="/home">
        <Button type="primary"> Back Home </Button>
      </RouterLink>
    </template>
  </Result>
</template>

<script setup lang="ts">
import { Result, Button } from 'ant-design-vue'
</script>

<style scoped lang="scss"></style>
