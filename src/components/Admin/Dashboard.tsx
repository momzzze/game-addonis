import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-wrap">
      {/* Section 1: Create Game */}
      <div className="w-full md:w-1/2 px-4 py-4">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Create Game</h2>
          {/* Your create game form or component */}
          {/* Example Link to a create game page */}
          <Link
            to="/create-game"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Create New Game
          </Link>
        </div>
      </div>

      {/* Section 2: View All Games */}
      <div className="w-full md:w-1/2 px-4 py-4">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-semibold mb-2">View All Games</h2>
          {/* Your view all games component */}
          {/* Example Link to view all games page */}
          <Link
            to="/view-all-games"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            View All Games
          </Link>
        </div>
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