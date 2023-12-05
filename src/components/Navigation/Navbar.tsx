import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

function Navbar() {
  return (
    <div className="flex py-3 items-center justify-between border-b bg-primary dark:bg-primary">
      <div className="flex gap-2 font-bold text-2xl px-3">
        <Link to={'/'}>
        <img
          className="w-50 h-10 mr-2 dark:invert"
          src={"/public/GALogo.svg"}
          alt="logo"
        />
        </Link>
        <Link to={"/about"}>About</Link>
      </div>
      <div className="flex gap-4 font-bold text-2xl px-3">
        <ModeToggle />
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
ModeToggle;
