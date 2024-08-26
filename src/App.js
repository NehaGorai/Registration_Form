import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email, password }]);

      if (error) {
        throw error;
      }
      setMessage('Registred');
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Incorrect data:', error);
      setMessage('Incorrect data');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg max-w-md w-full overflow-hidden" >
        <h1 className="text-2xl font-bold text-center py-4 text-white bg-cyan-950 ">Registration Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4 p-8 pb-4">
          <div>
            <input
              placeholder='Name'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b-2  focus:outline-none focus:ring-0 "
              required
            />
          </div>
          <div>
            <input
              placeholder='Email'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2  border-b-2  focus:outline-none focus:ring-0 "
              required
            />
          </div>
          <div>

            <input
              placeholder='Password'
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b-2  focus:outline-none focus:ring-0 "
              required
            />
          </div>
          <button
            type="submit"
            className=" flex px-6 m-auto bg-cyan-950 text-white py-2 rounded-lg font-semibold hover:bg-cyan-800 transition duration-300"
          >
            Register
          </button>
        </form>
        {message && (
          <p className=" pb-4 text-center text-green-500 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
