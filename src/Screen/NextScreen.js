import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { db, auth } from '../Firebase/Firebase'; // Ensure correct path
import { addDoc, collection, getDocs } from "firebase/firestore";

/**
 * AddPreferencesScreen Component
 * 
 * @returns {JSX.Element} - The rendered component.
 */
const AddPreferencesScreen = () => {
    const [preference, setPreference] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [error, setError] = useState('');
    const user = auth.currentUser; // Get current authenticated user

    useEffect(() => {
        const fetchPreferences = async () => {
            console.log("fetching")
            try {
                const querySnapshot = await getDocs(collection(db, "preferences"));
                const prefsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPreferences(prefsData);
            } catch (err) {
                console.error("Error fetching preferences:", err);
                setError("Failed to fetch preferences. Please try again.");
            }
        };

        fetchPreferences();
    }, []);

    const addPreference = async () => {
        if (preference.trim() && user) {
            try {
                await addDoc(collection(db, "preferences"), { text: preference, creator: user.email });
                setPreference('');
                // Refresh preferences list
                const querySnapshot = await getDocs(collection(db, "preferences"));
                const prefsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPreferences(prefsData);
            } catch (err) {
                console.error("Error adding preference:", err);
                setError("Failed to add preference. Please try again.");
            }
        }
    };

    return (
        // ignore this styling, just asked GPT to make smth look competent
        <Container>
            <Box mt={4}>
                <Typography variant="h4">Add Preferences</Typography>
                <Typography variant="subtitle1">Enter your preferences below:</Typography>
                <TextField
                    label="Enter a preference"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                />
                <Box mt={2} mb={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addPreference}
                        disabled={!preference}
                    >
                        Save Preference
                    </Button>
                </Box>
                {error && <Typography color="error">{error}</Typography>}
                <Typography variant="h5">Your Preferences:</Typography>
                <Box mt={2}>
                    {preferences.map((pref) => (
                        <Box key={pref.id} mb={2} p={2} border={1} borderColor="grey.300" borderRadius={4}>
                            <Typography>{pref.text}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}

export default AddPreferencesScreen;
