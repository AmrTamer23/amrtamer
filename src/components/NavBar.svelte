<script lang="ts">
  import type { Section } from "../lib/types";
  import clsx from "clsx";

  const navItemStyle = "text-xl cursor-pointer transition-opacity ";

  let hoveredItem: Section | Section[] = ["home", "projects", "blog"];

  let isOnNav = false;

  const handleMouseEnter = (item: Section) => {
    hoveredItem = item;
  };

  const handleMouseLeave = () => {
    if (!isOnNav && typeof hoveredItem === "string")
      hoveredItem = ["home", "projects", "blog"];
  };
</script>

<nav
  class="fixed top-0 z-10 px-10 w-full flex justify-between bg-background opacity-90 pt-10 pb-5"
>
  <a href="/">
    <span class="text-3xl text-white font-bold">AT23</span>
  </a>
  <div
    class="flex gap-6"
    on:mouseenter={() => (isOnNav = true)}
    on:mouseleave={() => {
      isOnNav = false;
      handleMouseLeave();
    }}
    role="navigation"
  >
    <a
      href="/"
      on:mouseenter={() => handleMouseEnter("home")}
      on:mouseleave={() => handleMouseLeave()}
    >
      <span
        class={clsx(
          navItemStyle,
          hoveredItem.includes("home") ? "opacity-100" : "opacity-30",
        )}
      >
        Home
      </span>
    </a>
    <a
      href="/projects"
      on:mouseenter={() => handleMouseEnter("projects")}
      on:mouseleave={() => handleMouseLeave()}
    >
      <span
        class={clsx(
          navItemStyle,
          hoveredItem.includes("projects") ? "opacity-100" : "opacity-30",
        )}
      >
        Projects
      </span>
    </a>
    <a
      href="/blog"
      on:mouseenter={() => handleMouseEnter("blog")}
      on:mouseleave={() => handleMouseLeave()}
    >
      <span
        class={clsx(
          navItemStyle,
          hoveredItem.includes("blog") ? "opacity-100" : "opacity-30",
        )}
      >
        Blog
      </span>
    </a>
  </div>
</nav>
