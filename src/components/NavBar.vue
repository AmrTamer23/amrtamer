<script lang="ts" setup>
import { ref } from "vue";
import clsx from "clsx";

const navItemStyle = "text-xl cursor-pointer transition-opacity ";

const hoveredItem = ref<Section | Section[]>(["home", "projects", "blog"]);

const isOnNav = ref<boolean>(false);

const handleMouseEnter = (item: Section) => {
  hoveredItem.value = item;
};

const handleMouseLeave = () => {
  if (isOnNav.value === false && typeof hoveredItem.value === "string")
    hoveredItem.value = ["home", "projects", "blog"];
};

const currentPath = ref<string>(window.location.pathname);
</script>
<template>
  <nav
    class="fixed top-0 z-10 flex h-[12dvh] w-full justify-between bg-background px-20 pb-5 pt-10 opacity-90"
  >
    <a href="/">
      <span class="text-3xl font-bold text-white">AT23</span>
    </a>
    <div
      class="flex [&_a]:px-4"
      @mouseenter="
        {
          () => (isOnNav = true);
        }
      "
      @mouseleave="
        {
          () => {
            isOnNav = false;
            handleMouseLeave();
          };
        }
      "
      role="navigation"
    >
      <a
        href="/"
        @mouseenter="handleMouseEnter('home')"
        @mouseleave="handleMouseLeave()"
        class="flex flex-col gap-2"
      >
        <span
          :class="
            clsx(
              navItemStyle,
              hoveredItem.includes('home') ? 'opacity-100' : 'opacity-30',
            )
          "
        >
          Home
        </span>
        <div v-if="currentPath === '/'" class="h-0.5 w-full bg-textBase"></div>
      </a>
      <a
        href="/projects"
        @mouseenter="handleMouseEnter('projects')"
        @mouseleave="handleMouseLeave()"
        class="flex flex-col gap-2"
      >
        <span
          :class="
            clsx(
              navItemStyle,
              hoveredItem.includes('projects') ? 'opacity-100' : 'opacity-30',
            )
          "
        >
          Projects
        </span>
        <div
          v-if="currentPath === '/projects'"
          class="h-0.5 w-full bg-textBase"
        ></div>
      </a>
      <a
        href="/blog"
        @mouseenter="handleMouseEnter('blog')"
        @mouseleave="handleMouseLeave()"
        class="flex flex-col gap-2"
      >
        <span
          :class="
            clsx(
              navItemStyle,
              hoveredItem.includes('blog') ? 'opacity-100' : 'opacity-30',
            )
          "
        >
          Blog
        </span>
        <div
          v-if="currentPath === '/blog'"
          class="h-0.5 w-full bg-textBase"
        ></div>
      </a>
    </div>
  </nav>
</template>
