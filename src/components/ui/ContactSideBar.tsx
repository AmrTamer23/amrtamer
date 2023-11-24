import { BsLinkedin } from "react-icons/bs";
import { FaSquareGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const iconStyle = "text-white/95 hover:text-white/70";

export default function ContactSideBar() {
  return (
    <nav className="flex flex-col gap-12 min-h-full items-end w-1/12 fixed top-[37vh] right-5">
      <a href="https://www.linkedin.com/in/amrtamer23/" target="_blank">
        <BsLinkedin size="50" className={iconStyle} />
      </a>

      <a href="https://github.com/AmrTamer23" target="_blank">
        <FaSquareGithub size="55" className={iconStyle} />
      </a>
      <a href="https://leetcode.com/AmrTamer23/" target="_blank">
        <SiLeetcode size="50" className={iconStyle} />
      </a>
    </nav>
  );
}
