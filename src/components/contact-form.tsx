import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowUpRight } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { z } from 'zod';

const validationSchema = z.object({
  email: z.string().min(1, { message: "This is required" }).email({ message: "Must be a valid email" }),
  name: z.string().min(1, { message: "Please enter your name" }),
  msg: z.string()
    .min(5, { message: "Please type your message" })
    .max(400, { message: "Please Keep it under 400 chars" })
});

type FormData = z.infer<typeof validationSchema>;

const inputClass = "w-full bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium dark:placeholder:text-zinc-600 placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none text-base py-1 px-2 flex rounded gap-1 items-center transition duration-200 border ring-zinc-800 ring-zinc-300 focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-zinc-400 focus-within:ring-offset-white dark:focus-within:ring-offset-black focus-within:ring-zinc-600";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    msg: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    try {
      validationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<FormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      msg: ''
    });
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await emailjs.send(
        "service_ha29zkv",
        "template_w6nohfb",
        {
          to_name: "Amr Tamer",
          from_name: formData.name,
          message: formData.msg,
          reply_to: formData.email,
        },
        "zVx7Mriub0Boa4slr"
      );

      toast("Email has been sent", {
        description: "Will get back to you soon!"
      });
      resetForm();
    } catch (err) {
      toast("Oops!", {
        description: "Error sending email, please try again!"
      });
      console.error("Error sending email", err);
    }
  };

  return (
    <>
      <div className="motion-blur-in-lg container flex w-full flex-col gap-2 rounded-lg bg-[#382e22] px-4 py-6">
        <div className="text-lg font-semibold italic text-primary">Want to hire me?</div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div className="h-fit w-1/2">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className={inputClass}
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
              {errors.name && (
                <span className="pt-0.5 text-sm text-red-400">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="h-fit w-1/2">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className={inputClass}
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
              {errors.email && (
                <span className="pt-0.5 text-sm text-red-400">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="h-fit w-full">
            <label htmlFor="msg" className="sr-only">Message</label>
            <textarea
              name="msg"
              id="msg"
              className={inputClass}
              placeholder="Message"
              value={formData.msg}
              onChange={(e) => setFormData(prev => ({ ...prev, msg: e.target.value }))}
              style={{ resize: 'none', minHeight: '140px' }}
            />
            {errors.msg && (
              <span className="pt-0.5 text-sm text-red-400">
                {errors.msg}
              </span>
            )}
          </div>
          <button
            className="w-full gap-1 self-end rounded-lg bg-zinc-900 px-4 py-2 text-base font-semibold text-zinc-100 transition-all duration-200 ease-in-out hover:bg-primary hover:text-zinc-900 lg:w-1/4 flex items-center justify-center"
            type="submit"
          >
            <span>Send</span>
            <ArrowUpRight className="h-6 w-6" />
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
}