<script setup lang="ts">
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Form, Field, ErrorMessage, useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { ref } from "vue";
import { toast } from "vue-sonner";

const inputClass =
  "size-full bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium dark:placeholder:text-zinc-600 placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-hidden text-base py-1 px-2 flex rounded-sm gap-1 items-center transition duration-200 border ring-zinc-800 ring-zinc-300 focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-zinc-400 focus-within:ring-offset-white dark:focus-within:ring-offset-black focus-within:ring-zinc-600";

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: "This is required" })
      .email({ message: "Must be a valid email" }),
    name: zod.string().min(1, {
      message: "Please enter your name",
    }),
    msg: zod
      .string()
      .min(5, {
        message: "Please type your message",
      })
      .max(400, {
        message: "Please Keep it under 400 chars",
      }),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});
const { value: email, resetField: resetEmail } = useField<string>("email");
const { value: name, resetField: resetName } = useField<string>("name");
const { value: msg, resetField: resetMsg } = useField<string>("msg");

async function sendEmail() {
  await emailjs
    .send(
      "service_ha29zkv",
      "template_w6nohfb",
      {
        to_name: "Amr Tamer",
        from_name: name.value,
        message: msg.value,
        reply_to: email.value,
      },
      "zVx7Mriub0Boa4slr",
    )
    .then(() => {
      toast("Email has been sent", {
        description: "Will get back to you soon!",
      });
      resetEmail();
      resetName();
      resetMsg();
    })
    .catch((err) => {
      toast("Oops!", {
        description: "Error sending email, please try again!",
      });
      console.error("Error sending email", err);
    });
}

const onSubmit = handleSubmit(async (values) => {
  await sendEmail();
});
</script>

<template>
  <div
    class="motion-blur-in-lg container flex w-full flex-col gap-2 rounded-lg bg-[#382e22] px-4 py-6"
  >
    <div class="text-lg font-semibold italic">Want to hire me?</div>
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <div class="flex gap-2">
        <div class="h-fit w-1/2">
          <label for="name" class="sr-only">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            :class="inputClass"
            placeholder="Name"
            v-model="name"
          />
          <span class="pt-0.5 text-sm text-red-400">
            {{ errors.name }}
          </span>
        </div>
        <div class="h-fit w-1/2">
          <label for="email" class="sr-only">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            :class="inputClass"
            placeholder="Email"
            v-model="email"
          />
          <span class="pt-0.5 text-sm text-red-400">
            {{ errors.email }}
          </span>
        </div>
      </div>
      <div class="h-fit w-full">
        <label for="msg" class="sr-only">Message</label>
        <textarea
          name="msg"
          id="msg"
          :class="inputClass"
          placeholder="Message"
          v-model="msg"
        ></textarea>
        <span class="pt-0.5 text-sm text-red-400">
          {{ errors.msg }}
        </span>
      </div>
      <Button
        class="w-full gap-1 self-end rounded-lg bg-zinc-900 px-4 py-2 text-base font-semibold text-zinc-100 transition-all duration-200 ease-in-out hover:bg-primary hover:text-zinc-900 lg:w-1/4"
        type="submit"
      >
        <span> Send </span>
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
          <path d="M7 7h10v10"></path>
          <path d="M7 17 17 7"></path>
        </svg>
      </Button>
    </form>
  </div>
  <Toaster />
</template>

<style>
textarea {
  resize: none;
  min-height: 140px;
}
</style>
