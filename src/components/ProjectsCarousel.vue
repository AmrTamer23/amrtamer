<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { projects } from "@/lib/projectsData";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { ImageIcon } from "lucide-vue-next";
import ProjectGalleryModal from "./ProjectGalleryModal.vue";

const isGalleryOpen = ref(false);

const openGallery = () => {
  isGalleryOpen.value = true;
};

const closeGallery = () => {
  isGalleryOpen.value = false;
};
</script>

<template>
  <main class="-mt-10 ml-14 mr-14 w-[90dvw] lg:mx-auto">
    <Carousel
      :opts="{
        loop: true,
      }"
    >
      <CarouselContent>
        <CarouselItem class="w-full" v-for="project in projects">
          <div
            class="motion-preset-focus-lg flex h-full w-full flex-col rounded-xl border-2 border-textBase lg:flex-row"
          >
            <div class="h-[40dvh] w-full lg:h-full lg:w-2/6">
              <img
                :src="project.image"
                :alt="project.name"
                class="h-full w-full rounded-se-lg rounded-ss-lg object-cover lg:rounded-es-lg lg:rounded-se-none"
              />
            </div>
            <div
              class="flex h-full flex-col justify-between gap-6 px-4 pb-4 pt-4 lg:w-4/6 lg:pt-8"
            >
              <div class="flex h-full flex-col gap-6 lg:w-3/4">
                <div class="flex flex-col gap-2">
                  <a
                    class="flex items-end hover:underline"
                    :name="project.name"
                    :href="project.link"
                    target="_blank"
                  >
                    <h2 class="text-xl font-bold">
                      {{ project.name }}
                    </h2>
                    <span class="text-lg">
                      {{ project.domain }}
                    </span>
                  </a>
                  <p class="text-base">{{ project.description }}</p>
                  <p class="text-base">{{ project.fullDescription }}</p>
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-lg"> Features: </span>
                  <ul class="list-inside list-disc pl-2">
                    <li
                      v-for="feature in project.features"
                      :key="feature"
                      class="text-base"
                    >
                      {{ feature }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="flex flex-col items-end justify-between gap-4 lg:flex-row lg:gap-0"
              >
                <div class="flex flex-col gap-2 lg:w-full">
                  <span> Built With </span>
                  <div class="flex flex-wrap gap-2">
                    <img
                      v-for="tech in project.technologies"
                      :src="`https://skillicons.dev/icons?i=${tech}`"
                      :alt="tech"
                      class="h-14 w-14"
                    />
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <Button
                    @click="openGallery"
                    class="gap-1 text-base"
                    v-if="project.galleryImages.length !== 0"
                  >
                    <ImageIcon class="h-6 w-6" />
                    <span>View Gallery</span>
                  </Button>
                  <a
                    v-if="project.sourceCode"
                    :href="project.sourceCode"
                    target="_blank"
                    name="GitHub"
                  >
                    <Button class="gap-1 text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-github h-6 w-6"
                      >
                        <path
                          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                        />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      <span> Source Code </span>
                    </Button>
                  </a>
                  <a :href="project.link" :name="project.name" target="_blank">
                    <Button class="gap-1 text-base">
                      <span> Visit It </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-arrow-up-right h-6 w-6"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ProjectGalleryModal
            v-if="project.galleryImages.length !== 0"
            :is-open="isGalleryOpen"
            :images="project.galleryImages"
            @close="closeGallery"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious
        class="border-textBase bg-transparent text-textBase hover:bg-primary"
      />
      <CarouselNext
        class="ml-4 border-textBase bg-transparent text-textBase hover:bg-primary"
      />
    </Carousel>
  </main>
</template>
