import React, { useState } from 'react';
import MidwayNav from './MapSystem/MidwayNav';
import PreferencesList from './Preferences/List';
import { Modal } from './utility_components';

export default function PreferencesView() {
  const [preferences, setPreferences] = useState([
    { name: 'hello', isRanked: false },
    { name: 'world', isRanked: false },
    { name: 'foo', isRanked: false },
    { name: 'bar', isRanked: false },
    { name: 'baz', isRanked: false },
  ]);
  const [newPreference, setNewPreference] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addPreference = () => {
    // check if the new preference is not empty and not already in the list (case-insensitive) by name key
    if (newPreference.trim() !== '' && !preferences.some(pref => pref.name.toLowerCase() === newPreference.trim().toLowerCase())) {
      setPreferences([...preferences, { name: newPreference.trim(), isRanked: false }]);
      setNewPreference('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="app-container flex flex-col items-center p-4 gap-2">
      <MidwayNav
        steps={[
          { stepCompleted: true, step: 'Sign In' },
          { stepCompleted: false, step: 'Preferences' },
        ]}
        numSteps={2}
        stage={1}
      />
      <h1 className="text-5xl font-bold mt-4">Is This Right?</h1>
      <p className="text-xl font-semibold">Select Your Preferences</p>
      <div className="rounded-lg shadow-lg p-4 w-10/12 my-4">
        <PreferencesList preferences={preferences} setPreferences={setPreferences} />
      </div>
      <button
        className="bg-hot-pink rounded-full px-8 py-3 text-white"
        onClick={() => setIsModalOpen(true)}
      >
        + add preference
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={"Add Preferences"}>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full"
          placeholder="preferences"
          value={newPreference}
          onChange={(e) => setNewPreference(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="bg-green text-white rounded-full px-4 py-2" onClick={addPreference}>
            add
          </button>
        </div>
      </Modal>
    </div>
  );
}
