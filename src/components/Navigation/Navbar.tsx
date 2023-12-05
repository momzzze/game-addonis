import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { Context } from "@/context/AuthContext";
import { useContext } from "react";
import { logout } from "@/services/auth.service";
import { Button } from "../ui/button";

function Navbar() {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const logoutHandler=async()=>{
    const logoutUser=await logout().then(()=>{
      setUser(null);
      navigate('/');
    })
    
  }

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
        {!user ? (<Link to={"/login"}>Login</Link>):(<Button className="text-2xl text-black dark:text-white" onClick={logoutHandler}>Logout</Button>)}
      </div>
    </div>
  );
}

export default Navbar;
ModeToggle;
