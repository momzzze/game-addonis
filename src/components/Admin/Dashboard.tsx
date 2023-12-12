import React from 'react';
import { Link } from 'react-router-dom';
import CreateGameForm from './CreateGameForm';
import DisplayAllGames from './DisplayAllGames';

const Dashboard: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
      {/* Section 1: Create Game */}
      <div className="w-full px-4 py-4">
        <CreateGameForm/>
      </div>

      {/* Section 2: View All Games */}
      <div className="w-full  px-4 py-4">
        <DisplayAllGames/>
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