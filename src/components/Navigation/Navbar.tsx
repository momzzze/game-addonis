import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { Context } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { logout } from "@/services/auth.service";
import { Button } from "../ui/button";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const logoutUser = await logout().then(() => {
      setUser(null);
      navigate("/");
    });
  };

  const toggleMenu=()=>{
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className="bg-primary">
      <div className="flex justify-between items-center px-2 py-3">
        <div className="flex gap-2 font-bold text-2xl px-3">
        <Link to={"/"}>
            <img
              className="w-50 h-10 mr-2 dark:invert"
              src={"/public/GALogo.svg"}
              alt="logo"
            />
          </Link>
          <Link className="invisible sm:visible" to={"/about"}>About</Link>
        </div>       
        <div className="flex items-center">
        <div className="flex invisible sm:visible">
          <ModeToggle />
          {!user ? (
            <Link className="rounded-md py-1 px-2 block font-semibold text-2xl hover:bg-orange-400" to={"/login"}>Login</Link>
          ) : (
            <Button
              className="text-2xl text-black dark:text-white"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
        </div>
        <div className="sm:hidden float-right">
            <button
              className="dark:text-white dark:hover:text-gray-400 dark:focus:text-gray-400 dark:focus:outline-none text-black  hover:text-white focus:text-white"
              type="button"
              onClick={toggleMenu}
            >
              <svg className="h-6 w-6 fill-current " viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H21V19H3V17Z"
                />
              </svg>
            </button>
          </div>
        </div>
        
        </div>
        {isMenuOpen && (
          <div className="px-2 pb-3 pt-3">
          <Link className="rounded-md py-1 px-2 block font-semibold text-2xl hover:bg-orange-400" to={'/'}>Home</Link>
          <Link className="rounded-md py-1 px-2 block font-semibold text-2xl hover:bg-orange-400" to={'/about'}>About</Link>  
          <div className="px-5">
              <ModeToggle />   
          </div> 
          {!user ? (
            <Link className="rounded-md py-1 px-2 block font-semibold text-2xl hover:bg-orange-400" to={"/login"}>Login</Link>
          ) : (
            <Button
            className="w-full text-start rounded-md py-1 text-black dark:text-white px-2 block font-semibold text-2xl hover:bg-orange-400"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
          </div>  
        )}
       
       {/* <div className="flex py-3 items-center justify-between border-b bg-primary dark:bg-primary">
        <div className="flex gap-2 font-bold text-2xl px-3">
          <Link to={"/"}>
            <img
              className="w-50 h-10 mr-2 dark:invert"
              src={"/public/GALogo.svg"}
              alt="logo"
            />
          </Link>
          <Link to={"/about"}>About</Link>
        </div>
        
      </div> */}
      
      </header>
      
    </>
  );
}

export default Navbar;
ModeToggle;
