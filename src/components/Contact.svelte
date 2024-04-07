<script lang="ts">
  import emailjs from "@emailjs/browser";
  import "ldrs/zoomies";
  import { onMount } from "svelte";

  onMount(() => {
    (function initEmailJS() {
      emailjs.init("zVx7Mriub0Boa4slr");
    })();
  });

  const fieldsetStyle = "w-full flex flex-col gap-3 items-center";
  const inputStyle =
    "w-1/2  text-xl p-2 rounded-lg  border-b-4 border-textBase border-solid bg-transparent focus:border-btnBase  focus:outline-none ";

  let isLoading = false;

  let name: string, email: string, message: string;

  async function sendEmail(
    name: string,
    email: string,
    message: string,
  ): Promise<boolean> {
    isLoading = true;
    return emailjs
      .send("service_ha29zkv", "template_w6nohfb", {
        from_name: name,
        to_name: "Amr Tamer",
        message: message,
        reply_to: email,
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    await sendEmail(name, email, message).then((res) => {
      if (res) {
        alert("Message Sent Successfully");
        name = "";
        email = "";
        message = "";
      } else {
        alert("Failed to send message");
      }
    });
  };
</script>

<section class="mt-16 h-screen pt-28" id="contact">
  <h1 class="text-center text-7xl">Contact Me</h1>
  <form
    on:submit={onSubmit}
    class="flex h-full w-full flex-col items-center justify-center"
  >
    <fieldset class={`${fieldsetStyle}  mb-8`}>
      <label class="sr-only" for="senderName"> Name </label>
      <input
        id="senderName"
        name="senderName"
        type="text"
        placeholder="Your Name"
        bind:value={name}
        class={inputStyle}
      />
    </fieldset>
    <fieldset class={`${fieldsetStyle}  my-8`}>
      <label class="sr-only" for="senderEmail"> Email </label>
      <input
        id="senderEmail"
        name="senderEmail"
        type="email"
        placeholder="Your Email"
        bind:value={email}
        class={inputStyle}
      />
    </fieldset>
    <fieldset class={`${fieldsetStyle} mt-8 h-1/2`}>
      <label class="sr-only" for="message"> Message </label>
      <textarea
        id="message"
        name="message"
        placeholder="Your Message"
        bind:value={message}
        class="focus:border-btnBase h-4/5 w-1/2 rounded-lg border-4 border-solid border-textBase bg-transparent p-2 text-xl focus:outline-none"
      />
    </fieldset>
    <button type="submit" class="btn -mt-9 w-1/2">
      {#if isLoading}
        <l-zoomies
          size="80"
          stroke="5"
          bg-opacity="0.1"
          speed="1.4"
          color="black"
        ></l-zoomies>
      {:else}
        Send
      {/if}
    </button>
  </form>
</section>
