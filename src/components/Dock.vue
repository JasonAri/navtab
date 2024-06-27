<template>
  <div>
    <div class="dock">
      <div class="dock-list">
        <section class="icon-box">
          <img src="../assets/images/icon.png" alt="icon" />
        </section>
        <section class="icon-box">
          <img src="../assets/images/icon.png" alt="icon" />
        </section>
        <section class="icon-box">
          <img src="../assets/images/icon.png" alt="icon" />
        </section>
        <section class="icon-box">
          <img src="../assets/images/icon.png" alt="icon" />
        </section>
        <section class="icon-box">
          <img src="../assets/images/icon.png" alt="icon" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dock {
  background-color: rgb(211, 211, 211, 0.5);
  min-width: 76px;
  height: 80px;
  position: absolute;
  text-align: center;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 26px;
  .dock-list {
    margin: 0 5px;
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
