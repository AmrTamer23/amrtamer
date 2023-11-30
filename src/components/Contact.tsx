import emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import { useEffect } from "react";

import * as Yup from "yup";

const fieldsetStyle = "w-full flex flex-col gap-3 items-center";
const inputStyle =
  "w-1/2  text-xl p-2 rounded-lg  border-b-4 border-rich_black-800 border-solid bg-transparent focus:border-rich_black-900  focus:outline-none ";

export default function Contact() {
  useEffect(() => {
    function initEmailJS() {
      emailjs.init("zVx7Mriub0Boa4slr");
    }
    initEmailJS();
  }, []);

  function sendEmail(name: string, email: string, message: string) {
    emailjs
      .send("service_ha29zkv", "template_w6nohfb", {
        from_name: name,
        to_name: "Amr Tamer",
        message: message,
        reply_to: email,
      })
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      });
  }

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

    onSubmit: (values) => {
      sendEmail(values.senderName, values.senderEmail, values.message);
      formik.resetForm();
    },
  });
  return (
    <section className="h-screen mt-16 pt-28" id="contact">
      <h1 className="text-7xl text-center">Contact Me</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center w-full h-full"
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
        <fieldset className={`${fieldsetStyle} h-1/2 mt-8`}>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            onChange={formik.handleChange}
            value={formik.values.message}
            className="w-1/2 h-4/5 text-xl p-2 rounded-lg  border-4 border-rich_black-800 border-solid bg-transparent focus:border-rich_black-900 focus:outline-none "
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="text-red-600">{formik.errors.message}</div>
          ) : null}
        </fieldset>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-2  w-1/2 -mt-9"
        >
          Send
        </button>
      </form>
    </section>
  );
}
