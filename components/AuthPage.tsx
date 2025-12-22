
import React, { useState } from 'react';
import { AuthDetails, User } from '../types';
import Button from './Button';

interface AuthPageProps {
  onLogin: (authDetails: AuthDetails) => void;
  onRegister: (newUserDetails: Omit<User, 'xpPoints'>) => void;
  errorMessage: string | null;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [isSenior, setIsSenior] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSuccessMessage(null); // Clear previous messages
    if (isRegistering) {
      if (!email || !id || !course || !year) {
        // Basic validation for registration fields
        return;
      }
      onRegister({ email, id, course, year: Number(year), isSenior });
    } else {
      onLogin({ email, id });
    }
  };

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
    setEmail('');
    setId('');
    setCourse('');
    setYear('');
    setIsSenior(false);
    setRegisterSuccessMessage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
          EduCycle {isRegistering ? 'Registration' : 'Login'}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {isRegistering
            ? 'Create your account to start sharing and reusing academic resources.'
            : 'Enter your college email and identification number to access the platform. Verified accounts ensure trust within our campus community.'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              College Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              placeholder="your.email@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="id" className="block text-gray-700 text-sm font-semibold mb-2">
              Identification Number
            </label>
            <input
              type="text"
              id="id"
              className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              placeholder="Unique ID (e.g., SENIOR001, JUNIOR001)"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          {isRegistering && (
            <>
              <div>
                <label htmlFor="course" className="block text-gray-700 text-sm font-semibold mb-2">
                  Course
                </label>
                <input
                  type="text"
                  id="course"
                  className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  placeholder="e.g., Computer Science, Electrical Engineering"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-gray-700 text-sm font-semibold mb-2">
                  Academic Year (e.g., 2025 for a junior graduating in 2025)
                </label>
                <input
                  type="number"
                  id="year"
                  className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  placeholder="e.g., 2025"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value) || '')}
                  required
                  min="1900" // Sensible minimum year
                  max="2100" // Sensible maximum year
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isSenior"
                  className="form-checkbox h-5 w-5 text-emerald-600 bg-gray-50 border-gray-300 rounded focus:ring-emerald-500"
                  checked={isSenior}
                  onChange={(e) => setIsSenior(e.target.checked)}
                />
                <label htmlFor="isSenior" className="ml-2 text-gray-700 text-sm font-semibold">
                  I am a Senior (donating items)
                </label>
              </div>
            </>
          )}

          {errorMessage && (
            <p role="alert" className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
          {registerSuccessMessage && (
            <p role="status" className="text-green-600 text-sm text-center">{registerSuccessMessage}</p>
          )}
          <Button
            type="submit"
            className="w-full p-3 text-lg"
            disabled={
              !email ||
              !id ||
              (isRegistering && (!course || !year))
            }
          >
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleMode}
            className="font-bold underline text-emerald-600 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md p-1 -m-1"
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;