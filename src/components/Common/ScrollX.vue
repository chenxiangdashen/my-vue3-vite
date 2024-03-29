<template>
  <div
    ref="wrapper"
    class="tags-wrapper"
    @mousewheel.prevent="handleMouseWheel"
  >
    <template v-if="showArrow && isOverflow">
      <div class="left" @click="handleMouseWheel({ wheelDelta: 50 })">
        <IconArrowLeft />
      </div>
      <div class="right" @click="handleMouseWheel({ wheelDelta: -50 })">
        <IconArrowRight />
      </div>
    </template>

    <div
      ref="content"
      class="tags-content"
      :class="{ overflow: isOverflow && showArrow }"
      :style="{
        height: height + 'px',
        transform: `translateX(${translateX}px)`,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IconArrowLeft, IconArrowRight } from "@/components/AppIcons";
import { debounce } from "@/utils";
import { isNullOrUndef } from "@/utils/is";

defineProps({
  height: {
    type: Number,
    default: 50,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
});

onMounted(() => {
  refreshIsOverflow(null);
});

const translateX: any = ref(0);
const content: any = ref(null);
const wrapper: any = ref(null);
const isOverflow: any = ref(false);

function refreshIsOverflow(isIncrease: any | null) {
  isOverflow.value = content?.value?.offsetWidth > wrapper.value.offsetWidth;
  if (isNullOrUndef(isIncrease)) return;
  if (isOverflow.value) {
    handleMouseWheel({ wheelDelta: isIncrease ? -100 : 100 });
  } else if (!isIncrease && translateX.value < 0) {
    handleMouseWheel({ wheelDelta: 100 });
  }
}
function handleMouseWheel(e: any) {
  const { wheelDelta } = e;
  const wrapperWidth: any = wrapper.value.offsetWidth;
  const contentWidth: any = content.value.offsetWidth;
  /**
   * @wheelDelta 平行滚动的值 >0： 右移  <0: 左移
   * @translateX 内容translateX的值
   * @wrapperWidth 容器的宽度
   * @contentWidth 内容的宽度
   */
  if (wheelDelta < 0 && -translateX.value > contentWidth - wrapperWidth + 10) {
    return;
  }
  if (wheelDelta > 0 && translateX.value > 10) {
    return;
  }

  translateX.value += wheelDelta;

  resetTranslateX(wrapperWidth, contentWidth);
}

const resetTranslateX = debounce(
  function (wrapperWidth: any, contentWidth: any) {
    if (!isOverflow.value) {
      translateX.value = 0;
    } else if (-translateX.value > contentWidth - wrapperWidth) {
      translateX.value = wrapperWidth - contentWidth;
    } else if (translateX.value > 0) {
      translateX.value = 0;
    }
  },
  200,
  false
);

defineExpose({
  refreshIsOverflow,
});
</script>

<style lang="scss" scoped>
.tags-wrapper {
  display: flex;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 9;
  overflow: hidden;
  .tags-content {
    padding: 0 10px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    transition: transform 0.5s;
    &.overflow {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .left,
  .right {
    background-color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;

    width: 20px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    border: 1px solid #e0e0e6;
    border-radius: 2px;

    z-index: 2;
    cursor: pointer;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
}
</style>
