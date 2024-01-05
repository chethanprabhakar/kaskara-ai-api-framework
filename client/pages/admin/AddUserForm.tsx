// AddUserForm.js
import React, { useState } from 'react';

const AddUserForm = ({ addUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: new Date().getTime(), // Use a unique ID (can be generated differently in production)
      name: name,
      email: email,
      role: 'User', // Set default role as 'User'
    };
    addUser(newUser);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 px-4 py-2 rounded">
      <div className="flex flex-wrap -mx-3 mb-6 ">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Members Name
          </label>
          <input 
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type='text'
          name='name'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)} />
          <p className="text-red-500 text-xs italic">Please enter a member name</p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Members Email
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
        <div className="flex flex-col items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline align:center" type="submit">
            Sign In
          </button>
        </div>
    </form>
  );
};

export default AddUserForm;
