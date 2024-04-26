<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { projects } from "@/lib/projectsData";
import Image from "astro/components/Image.astro";
</script>

<template>
  <main class="mx-auto h-[70dvh] w-[70dvw]">
    <Carousel
      :opts="{
        loop: true,
      }"
    >
      <CarouselContent>
        <CarouselItem class="h-[70dvh]" v-for="project in projects">
          <div class="border-textBase flex h-full w-full rounded-xl border-2">
            <div class="flex w-1/4 flex-col">
              <img
                :src="project.image"
                :alt="project.name"
                class="h-1/2 rounded-ee-xl rounded-ss-lg"
              />
              <div class="flex h-full flex-col justify-between gap-4 p-4">
                <div class="flex flex-col gap-2">
                  <h2 class="text-center text-xl font-bold">
                    {{ project.name }}
                  </h2>
                  <p>{{ project.description }}</p>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <span class="w-full text-center"> Built With </span>
                  <img
                    :src="
                      `https://skillicons.dev/icons?i=` + project.technologies
                    "
                    alt="Technologies Used"
                    class="inline w-3/4"
                  />
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious
        class="border-textBase text-textBase hover:bg-btnBase bg-transparent"
      />
      <CarouselNext
        class="border-textBase text-textBase hover:bg-btnBase bg-transparent"
      />
    </Carousel>
  </main>
</template>
