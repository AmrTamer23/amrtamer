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
  <nav class="fixed top-0 z-10 px-20 w-full flex justify-between bg-background/40 backdrop-blur-lg pt-10 pb-5">
    <a href="/">
      <h1 class="text-3xl text-white font-bold">AT23</h1>
    </a>
    <div class="flex gap-6">
      <a href="#home" @mouseenter="handleMouseEnter('home')" @mouseleave="handleMouseLeave()">
        <h3 :class="clsx(
          navItemStyle, hoveredItem.includes('home') ? 'opacity-100' : 'opacity-30'
        )">
          Home
        </h3>
      </a>
      <a href="#projects" @mouseenter="handleMouseEnter('projects')" @mouseleave="handleMouseLeave()">
        <h3 :class="clsx(
          navItemStyle, hoveredItem.includes('projects') ? 'opacity-100' : 'opacity-30'
        )">
          Projects
        </h3>
      </a>
      <a href="#contact" @mouseenter="handleMouseEnter('contact')" @mouseleave="handleMouseLeave()">
        <h3 :class="clsx(
          navItemStyle, hoveredItem.includes('contact') ? 'opacity-100' : 'opacity-30'
        )">
          Contact
        </h3>
      </a>
    </div>
  </nav>
</template>
