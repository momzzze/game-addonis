import React, { useEffect } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { Game } from "../Admin/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteGameFromFirestore, fetchGames } from "@/Store/GamesSlice";
import EditGame from "./EditGame";



const DisplayAllGames:React.FC = () => {   
  const [gameToEdit, setGameToEdit] = React.useState<Game | null>(null);
  const games=useSelector((state)=> state?.games?.gamesArray);  
  const navigate=useNavigate();
  
  const dispatch=useDispatch()

  //fetch games from firestore
  useEffect(()=>{
    dispatch(fetchGames());
  },[dispatch])

  //delete game from firestore
  const handleDeleteGame=(id:string)=>{
    dispatch(deleteGameFromFirestore(id));
  }

  const handleEdit=(game:Game)=>{
    navigate('/edit-game', { state: { game } });
  }



  return (
    <div className="">
      <h1>All Games</h1>
      <div className="">
        {games.length !== 0 &&
          games.map(({id,game}) => (
            <div key={id} className="rounded-lg text-white m-1 p-1 w-full">
              <div className="">
                <div className="border border-gray-300 p-2 rounded-lg flex md:flex-row justify-evenly items-center ">
                  <div className="flex-1">
                    <div className="flex flex-row items-center">                      
                      <img
                        src={game?.imageURLS[0]}
                        alt={`${game?.title} image`}
                        className="w-40 h-40 object-cover"
                      />
                      <span className="text-black dark:text-gray-300 p-4 pl-10">
                        {game?.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                    <Button asChild>
                    <Link to={`/edit-game/${id}`} className="bg-transparent hover:bg-transparent">
                       <Pencil className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </Link>                     
                    </Button>
                    <Button variant={"ghost"} onClick={()=>handleDeleteGame(id)}>
                      <Trash className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayAllGames;
