import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateGameForm from '../Games/CreateGameForm';
import { getGames } from '@/services/game.service';
import DisplayAllGames from '../Games/DisplayAllGames';

export type Game = {
  id: string;
  title: string;
  description: string;
  imageURLS: string[];
  tags: string[];
  addonCategories: string[];
};

const Dashboard: React.FC = () => {
  

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="w-full px-60 py-4">
        <CreateGameForm/>
      </div>
      <div className="w-full  px-4 py-4">
        <DisplayAllGames/>
      </div>
      <div className="w-full px-4 py-4">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-semibold mb-2">View All Users</h2>
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