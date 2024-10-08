<script lang="ts" setup>
import { ref } from "vue";
import clsx from "clsx";
import { useMediaQuery } from "@vueuse/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const isLargeScreen = useMediaQuery("(min-width: 1024px)");

const navItemStyle = "text-md cursor-pointer transition-opacity font-medium ";

const hoveredItem = ref<Section | Section[]>([
  "home",
  "projects",
  "work",
  "blog",
]);

const isOnNav = ref<boolean>(false);

const handleMouseEnter = (item: Section) => {
  hoveredItem.value = item;
};

const handleMouseLeave = () => {
  if (isOnNav.value === false && typeof hoveredItem.value === "string")
    hoveredItem.value = ["home", "projects", "work", "blog"];
};

const currentPath = ref<string>("");

if (typeof window !== "undefined") {
  currentPath.value = window.location.pathname;
}
</script>
<template>
  <nav
    class="fixed top-0 z-30 flex h-fit w-full items-center justify-between bg-black/90 px-8 pb-5 pt-10 opacity-90 lg:px-20"
  >
    <a href="/">
      <span class="z-50 text-lg font-extrabold text-primary" id="logo"
        >AT23</span
      >
    </a>
    <div
      v-if="isLargeScreen"
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
        data-astro-prefetch="hover"
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
        href="/work"
        @mouseenter="handleMouseEnter('work')"
        @mouseleave="handleMouseLeave()"
        class="flex flex-col gap-2"
        data-astro-prefetch="hover"
      >
        <span
          :class="
            clsx(
              navItemStyle,
              hoveredItem.includes('work') ? 'opacity-100' : 'opacity-30',
            )
          "
        >
          Work
        </span>
        <div
          v-if="currentPath === '/work'"
          class="h-0.5 w-full bg-textBase"
        ></div>
      </a>
      <a
        href="/blog"
        @mouseenter="handleMouseEnter('blog')"
        @mouseleave="handleMouseLeave()"
        class="flex flex-col gap-2"
        data-astro-prefetch="tap"
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
    <DropdownMenu v-else>
      <DropdownMenuTrigger aria-label="Navigation Menu">
        <span
          class="icon-[streamline--interface-setting-menu-2-button-parallel-horizontal-lines-menu-navigation-staggered-three-hamburger] h-6 w-6"
          role="img"
          aria-hidden="true"
        ></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        class="mr-4 border-primary bg-background shadow-2xl *:text-base"
      >
        <DropdownMenuItem>
          <a href="/"> Home </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/projects"> Projects </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/work"> Work </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/blog"> Blog </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
</template>

<style scoped>
* {
  color: var(--text-color);
}
#logo {
  text-shadow: 2px 4px 5px rgba(198, 172, 143, 0.3);
}
</style>
