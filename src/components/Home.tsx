import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    const hiddenElements = document.querySelectorAll(".hide");
    hiddenElements.forEach((element) => {
      observer.observe(element);
    });
  }, []);
  return (
    <section className="flex flex-col my-56 gap-5">
      <h3 className="text-3xl">Hi, my name is</h3>
      <h1 className="text-8xl">Amr Tamer</h1>
      <h1 className="text-8xl text-white/70 hide">Software Engineer,</h1>
      <p className="text-4xl hide">
        Front-End Developer and Computer Science Student who is always eager to
        learn new things.
      </p>
      <a
        className="h-12 w-1/5 hide"
        href="https://drive.google.com/file/d/10RrYjeea-F6ZpEsufV9v3FTMnaosrYiV/view?usp=sharing"
        target="_blank"
      >
        <button className=" h-full w-full bg-sunset text-black text-3xl rounded-lg mt-2">
          Download CV
        </button>
      </a>

      <section className="mt-48 flex flex-col gap-28 hide">
        <div className="flex flex-col justify-center gap-7">
          <h2 className="text-5xl text-center">Languages</h2>

          <img
            src="https://skillicons.dev/icons?i=cpp,python,html,css,js,ts"
            className="w-2/5 self-center"
          />
        </div>
        <div className="flex flex-col justify-center gap-7">
          <h2 className="text-5xl text-center">Frameworks/Libs/Tools</h2>

          <img
            src="https://skillicons.dev/icons?i=tailwindcss,react,nextjs,astro,firebase,figma"
            className="w-2/5 self-center"
          />
        </div>
      </section>
    </section>
  );
}
