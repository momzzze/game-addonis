import { getGames } from "@/services/game.service";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { Game } from "./Dashboard";

interface DisplayAllGamesProps {
    games: Game[];
  }


const DisplayAllGames:React.FC<DisplayAllGamesProps> = ({games}) => {  
    
  

  return (
    <div className="">
      <h1>All Games</h1>
      <div className="">
        {games.length !== 0 &&
          games.map((game) => (
            <div key={game.id} className="rounded-lg text-white m-1 p-1 w-full">
              <div className="">
                <div className="border border-gray-300 p-2 rounded-lg flex md:flex-row justify-evenly items-center ">
                  <div className="flex-1">
                    <div className="flex flex-row items-center">                      
                      <img
                        src={game.imageURLS[0]}
                        alt={`${game.title} image`}
                        className="w-40 h-40 object-cover"
                      />
                      <span className="text-black dark:text-gray-300 p-4 pl-10">
                        {game.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                    <Button variant={"ghost"}>
                      <Pencil className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </Button>
                    <Button variant={"ghost"}>
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
