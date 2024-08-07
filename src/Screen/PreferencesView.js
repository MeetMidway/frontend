import React, { useState } from 'react';
import MidwayNav from './MapSystem/MidwayNav';
import DraggableList from './DraggableList';
import Modal from './Modal';

export default function PreferencesView() {
  const [preferences, setPreferences] = useState(["hello", "world", "this", "is", "a", "test"]);
  const [newPreference, setNewPreference] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);  

  const addPreference = () => {
    if (newPreference.trim() !== '' && !preferences.includes(newPreference.trim())) {
      setPreferences([...preferences, newPreference.trim()]);
      setNewPreference('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="app-container flex flex-col items-center p-4 gap-2">
      <MidwayNav steps={[{stepCompleted: true, step: 'Sign In'}, {stepCompleted: false, step: 'Preferences'}]} numSteps={2} stage={1} />
      <h1 className="text-5xl font-bold mt-4">Is This Right?</h1>
      <p className="text-xl font-semibold">Select Your Preferences</p>
      <p className="text-gray-200 font-semibold">drag to reorder</p>
      <div className="rounded-lg shadow-lg p-4 w-10/12 my-4">
        <DraggableList items={preferences} setItems={setPreferences} />
      </div>
      <button 
        className="bg-hot-pink rounded-full px-8 py-3 text-white"
        onClick={() => setIsModalOpen(true)}>+ add preference</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add Preferences</h2>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full"
          placeholder="preferences"
          value={newPreference}
          onChange={(e) => setNewPreference(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-green text-white rounded-full px-4 py-2"
            onClick={addPreference}
          >
            add
          </button>
        </div>
      </Modal>
    </div>
  );
};