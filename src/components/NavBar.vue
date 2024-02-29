<script lang="ts" setup>
import { ref } from 'vue';
import clsx from 'clsx';

const navItemStyle = "text-2xl cursor-pointer transition-opacity ";

const hoveredItem = ref<Sections | Sections[]>([
  "home",
  "projects",
  "contact",
]);

const handleMouseEnter = (item: Sections) => {
  hoveredItem.value = item;
};

const handleMouseLeave = () => {
  hoveredItem.value = ["home", "projects", "contact"];
};
</script>
<template>
  <nav class="fixed top-0 z-10 px-20 w-full flex justify-between  bg-background  opacity-90  pt-10 pb-5">
    <a href="/">
      <h1 class="text-3xl text-white font-bold font-pt">AT23</h1>
    </a>
    <div class="flex gap-6">
      <a href="#home" @mouseenter="handleMouseEnter('home')" @mouseleave="handleMouseLeave()">
        <span :class="clsx(
          navItemStyle, hoveredItem.includes('home') ? 'opacity-100' : 'opacity-30'
        )">
          Home
        </span>
      </a>
      <a href="#projects" @mouseenter="handleMouseEnter('projects')" @mouseleave="handleMouseLeave()">
        <span :class="clsx(
          navItemStyle, hoveredItem.includes('projects') ? 'opacity-100' : 'opacity-30'
        )">
          Projects
        </span>
      </a>
      <a href="#contact" @mouseenter="handleMouseEnter('contact')" @mouseleave="handleMouseLeave()">
        <span :class="clsx(
          navItemStyle, hoveredItem.includes('contact') ? 'opacity-100' : 'opacity-30'
        )">
          Contact
        </span>
      </a>
    </div>
  </nav>
</template>
