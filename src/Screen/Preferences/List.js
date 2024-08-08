import React, { useState } from 'react';
import PreferenceItem from './Item';

export default function PreferencesList({ preferences, setPreferences }) {
  const colors = ['bg-purple', 'bg-yellow', 'bg-red', 'bg-blue', 'bg-green'];

  const handlePreferenceClick = (preference) => {
    const updatedPreferences = preferences.map((pref) => {
      if (pref.name === preference.name) {
        return { ...pref, isRanked: !pref.isRanked };
      }
      return pref;
    });

    const ranked = updatedPreferences.filter(pref => pref.isRanked).sort((a, b) => a.rank - b.rank);
    ranked.forEach((pref, index) => {
      pref.rank = index + 1;
    });

    const unranked = updatedPreferences.filter(pref => !pref.isRanked);

    setPreferences([...ranked, ...unranked]);
  };

  const rankedPreferences = preferences.filter(pref => pref.isRanked).sort((a, b) => a.rank - b.rank);
  const unrankedPreferences = preferences.filter(pref => !pref.isRanked);

  return (
    <div className="flex flex-wrap gap-2">
      {rankedPreferences
        .sort((a, b) => a.rank - b.rank)
        .map((pref, index) => (
          <PreferenceItem
            key={pref.name}
            idx={pref.rank}
            isRanked={pref.isRanked}
            onClick={() => handlePreferenceClick(pref)}
            color={colors[index % colors.length]}
          >
            {pref.name}
          </PreferenceItem>
        ))}
      {unrankedPreferences.map((pref) => (
        <PreferenceItem
          key={pref.name}
          idx={null}
          isRanked={pref.isRanked}
          onClick={() => handlePreferenceClick(pref)}
          color="bg-gray-400"
        >
          {pref.name}
        </PreferenceItem>
      ))}
    </div>
  );
};