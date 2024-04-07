<script lang="ts">
  import type { Section } from "../lib/types";
  import clsx from "clsx";

  const navItemStyle = "text-2xl cursor-pointer transition-opacity ";

  let hoveredItem: Section | Section[] = ["home", "projects", "contact"];

  let isOnNav = false;

  const handleMouseEnter = (item: Section) => {
    hoveredItem = item;
  };

  const handleMouseLeave = () => {
    if (!isOnNav && typeof hoveredItem === "string")
      hoveredItem = ["home", "projects", "contact"];
  };
</script>

<nav
  class="fixed top-0 z-10 px-20 w-full flex justify-between bg-background opacity-90 pt-10 pb-5"
>
  <a href="/">
    <h1 class="text-3xl text-white font-bold font-pt">AT23</h1>
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
      href="#home"
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
      href="#projects"
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
      href="#contact"
      on:mouseenter={() => handleMouseEnter("contact")}
      on:mouseleave={() => handleMouseLeave()}
    >
      <span
        class={clsx(
          navItemStyle,
          hoveredItem.includes("contact") ? "opacity-100" : "opacity-30",
        )}
      >
        Contact
      </span>
    </a>
  </div>
</nav>
