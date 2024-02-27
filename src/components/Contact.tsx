import emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { zoomies } from "ldrs";

const fieldsetStyle = "w-full flex flex-col gap-3 items-center";
const inputStyle =
  "w-1/2  text-xl p-2 rounded-lg  border-b-4 border-rich_black-800 border-solid bg-transparent focus:border-rich_black-900  focus:outline-none ";

async function sendEmail(
  name: string,
  email: string,
  message: string,
): Promise<boolean> {
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
    });
}

export default function Contact() {
  useEffect(() => {
    zoomies.register();
    function initEmailJS() {
      emailjs.init("zVx7Mriub0Boa4slr");
    }
    initEmailJS();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      senderName: "",
      senderEmail: "",
      message: "",
    },

    validationSchema: Yup.object({
      senderName: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      senderEmail: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      message: Yup.string()
        .max(1000, "Must be 1000 characters or less")
        .min(10, "Must be 10 characters or more")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      sendEmail(values.senderName, values.senderEmail, values.message)
        .then((result) => {
          if (result) {
            toast.success("Message sent successfully");
            formik.resetForm();
          } else {
            toast.error("Message failed to send");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });
  return (
    <section className="mt-16 h-screen pt-28" id="contact">
      <h1 className="text-center text-7xl">Contact Me</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex h-full w-full flex-col items-center justify-center"
      >
        <fieldset className={`${fieldsetStyle}  mb-8`}>
          <input
            id="senderName"
            name="senderName"
            type="text"
            placeholder="Your Name"
            onChange={formik.handleChange}
            value={formik.values.senderName}
            className={inputStyle}
          />
          {formik.touched.senderName && formik.errors.senderName ? (
            <div className="text-red-600">{formik.errors.senderName}</div>
          ) : null}
        </fieldset>
        <fieldset className={`${fieldsetStyle}  my-8`}>
          <input
            id="senderEmail"
            name="senderEmail"
            type="email"
            placeholder="Your Email"
            onChange={formik.handleChange}
            value={formik.values.senderEmail}
            className={inputStyle}
          />
          {formik.touched.senderEmail && formik.errors.senderEmail ? (
            <div className="text-red-600">{formik.errors.senderEmail}</div>
          ) : null}
        </fieldset>
        <fieldset className={`${fieldsetStyle} mt-8 h-1/2`}>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            onChange={formik.handleChange}
            value={formik.values.message}
            className="border-rich_black-800 focus:border-rich_black-900 h-4/5 w-1/2 rounded-lg  border-4 border-solid bg-transparent p-2 text-xl focus:outline-none "
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="text-red-600">{formik.errors.message}</div>
          ) : null}
        </fieldset>
        <button
          type="submit"
          className="-mt-9 w-1/2 rounded-lg bg-blue-600  p-2 text-white"
        >
          {isLoading ? (
            <l-zoomies
              size="80"
              stroke="5"
              bg-opacity="0.1"
              speed="1.4"
              color="white"
            ></l-zoomies>
          ) : (
            "Send"
          )}
        </button>
      </form>
      <ToastContainer theme="dark" transition={Slide} />
    </section>
  );
}
