import { getGames } from "@/services/game.service";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";

type Game = {
  id: string;
  title: string;
  description: string;
  imageURLS: string[];
  tags: string[];
  addonCategories: string[];
};

const DisplayAllGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  const gamesList = async () => {
    const games = await getGames();
    setGames(games);
  };

  useEffect(() => {
    gamesList();
  }, []);

  return (
    <div className="">
      <h1>All Games</h1>
      <div className="flex flex-row">
        {games.length !== 0 &&
          games.map((game) => (
            <div key={game.id} className="rounded-lg text-white m-1 p-1 w-full">
              <div className="">
                <div className="border border-gray-300 p-2 rounded-lg flex md:flex-row justify-evenly items-center ">
                  <span className="text-black dark:text-gray-300 p-4 flex-1 pl-10">
                    {game.title}
                  </span>
                  <Button variant={"ghost"}>
                    <Pencil className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </Button>
                  <Button variant={"ghost"}>
                    <Trash className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayAllGames;
