<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";
import { useCarousel } from "./useCarousel";
import type { WithClassAsProps } from "./interface";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const props = defineProps<WithClassAsProps>();

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    :class="
      cn(
        'absolute h-10 w-10 touch-manipulation rounded-full p-0',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    variant="outline"
    @click="scrollPrev"
    name="Previous"
    aria-label="Previous"
  >
    <slot>
      <ArrowLeft class="h-8 w-8 text-current" />
    </slot>
  </Button>
</template>
