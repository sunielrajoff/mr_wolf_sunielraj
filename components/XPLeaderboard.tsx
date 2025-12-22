
import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { generateMotivationQuote } from '../services/geminiService';

interface XPLeaderboardProps {
  leaderboardUsers: User[]; // Already sorted by XP descending
}

const XPLeaderboard: React.FC<XPLeaderboardProps> = ({ leaderboardUsers }) => {
  const [motivationQuote, setMotivationQuote] = useState<string>('Loading an inspiring quote...');

  useEffect(() => {
    const fetchQuote = async () => {
      const quote = await generateMotivationQuote();
      setMotivationQuote(quote);
    };
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch quote only once on component mount

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-2xl border border-gray-300 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Senior Contribution Leaderboard</h2>
      <p className="text-center text-gray-600 mb-8 italic">
        "{motivationQuote}"
      </p>

      {leaderboardUsers.length === 0 ? (
        <p className="text-center text-xl text-gray-700 mt-8">No seniors on the leaderboard yet. Be the first to share!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Senior ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Course & Year
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  XP Points
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Recognition
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboardUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${index === 0 ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold' : 'hover:bg-gray-50 transition-colors'}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {user.course} ({user.year})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600">
                    {user.xpPoints}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {index === 0 ? '🏆 Top Contributor!' : 'Valued Supporter'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default XPLeaderboard;