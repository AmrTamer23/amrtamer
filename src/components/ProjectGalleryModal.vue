<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/95 p-4"
    >
      <div class="relative w-full rounded-lg">
        <Button
          @click="close"
          variant="secondary"
          class="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          <XIcon class="h-6 w-6" />
        </Button>
        <div class="p-4">
          <img
            :src="currentImage"
            :alt="`Project image ${currentIndex + 1}`"
            class="h-auto max-h-[70vh] w-full object-contain"
          />
        </div>
        <div class="flex items-center justify-between p-4">
          <Button
            @click="prevImage"
            class="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
            :disabled="currentIndex === 0"
          >
            <ChevronLeftIcon class="h-8 w-8 fill-zinc-900" />
          </Button>
          <span class="text-sm text-zinc-500"
            >{{ currentIndex + 1 }} / {{ images?.length }}</span
          >
          <Button
            @click="nextImage"
            class="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
            :disabled="currentIndex === (images?.length ?? 0) - 1"
          >
            <ChevronRightIcon class="h-8 w-8 fill-zinc-900" />
          </Button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";
import Button from "./ui/button/Button.vue";

const props = defineProps({
  isOpen: Boolean,
  images: Array,
});

const emit = defineEmits(["close"]);

const currentIndex = ref(0);
const currentImage = ref("");

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue && props.images && props.images.length > 0) {
      currentIndex.value = 0;
      currentImage.value = props.images[0] as string;
    }
  },
);

const close = () => {
  emit("close");
};

const nextImage = () => {
  if (props.images && currentIndex.value < props.images.length - 1) {
    currentIndex.value++;
    currentImage.value = props.images[currentIndex.value] as string;
  }
};
const prevImage = () => {
  if (props.images && currentIndex.value > 0) {
    currentIndex.value--;
    currentImage.value = props.images[currentIndex.value] as string;
  }
};
</script>
