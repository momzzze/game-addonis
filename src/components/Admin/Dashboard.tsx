import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateGameForm from './CreateGameForm';
import DisplayAllGames, { Game } from './DisplayAllGames';
import { getGames } from '@/services/game.service';

export type Game = {
  id: string;
  title: string;
  description: string;
  imageURLS: string[];
  tags: string[];
  addonCategories: string[];
};

const Dashboard: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  const refreshGames = async () => {
    const fetchedGames = await getGames();
    setGames(fetchedGames);
  };
  useEffect(() => {
    refreshGames();
  }, [games]);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
      {/* Section 1: Create Game */}
      <div className="w-full px-4 py-4">
        <CreateGameForm onGameCreated={refreshGames}/>
      </div>

      {/* Section 2: View All Games */}
      <div className="w-full  px-4 py-4">
        <DisplayAllGames games={games}/>
      </div>

      {/* Section 3: View All Users */}
      <div className="w-full px-4 py-4">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-semibold mb-2">View All Users</h2>
          {/* Your view all users component */}
          {/* Example Link to view all users page */}
          <Link
            to="/view-all-users"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
          >
            View All Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;