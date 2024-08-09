import BackIcon from "../assets/icons/BackIcon";
import { UserContext } from "../contexts/UserProvider";
import { TextInput } from "./utility_components";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { updateEmail, signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { checkFields } from "../Firebase/firebaseFuncs";
import LeaveIcon from "../assets/icons/LeaveIcon";
import PreferencesList from "./Preferences/List";
import AddIcon from "../assets/icons/AddIcon";
import { Modal } from "./utility_components";
import AutoCompleteLocation from "./MapSystem/AutoCompleteLocation";

export default function ManageAccount() {
  const nav = useNavigate();

  const [user] = useContext(UserContext);
  const [email, setEmail] = useState(user?.email);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [location, setLocation] = useState(user?.location);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState(user?.preferences);
  const [selectedPref, setSelectedPref] = useState(user?.preferences);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState();

  const [newPreference, setNewPreference] = useState("");

  async function handleUpdate() {
    if (checkFields({ email, firstName, lastName, location })) {
      setLoading(true);
      const data = {
        first_name: firstName,
        lastName: lastName,
        email: email,
        location: location,
        preferences: selectedPref,
      };

      console.log("Hi");
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, data);

      //if teh email changes, update the auth
      if (email != auth.currentUser.email) {
        updateEmail(auth.currentUser, email)
          .then(() => {
            // Email updated!
            // ...
          })
          .catch((error) => {
            setError("Invalid Email");
            setTimeout(() => {
              setError(""); // Reset after 5 seconds
            }, 5000);
          });
      }

      !!!error && setUpdate(true); // Indicate that the update is successful
      setTimeout(() => {
        setUpdate(false); // Reset after 5 seconds
      }, 5000);
    } else {
      console.log("hi");
      setError("An error occured");
      setTimeout(() => {
        setError(""); // Reset after 5 seconds
      }, 5000);
    }
  }

  console.log(selectedPref);

  const addPreference = () => {
    // check if the new preference is not empty and not already in the list (case-insensitive) by name key
    if (
      newPreference.trim() !== "" &&
      !preferences.some(
        (pref) => pref.name.toLowerCase() === newPreference.trim().toLowerCase()
      )
    ) {
      setPreferences([
        ...preferences,
        { name: newPreference.trim(), isRanked: false },
      ]);
      setNewPreference("");
      setIsModalOpen(false);
    }
  };
  const handleLocation = (val, idx) => {
    setLocation(val);
  };

  async function handleSignOut() {
    signOut(auth)
      .then(() => {
        localStorage.clear(); // we need somethig less volatile
        nav("/signin");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  console.log(update);

  return (
    <div className="w-full h-full bg-base-white flex flex-col gap-y-16 justify-between pb-10 items-center">
      <div className="bg-white h-20 w-full shadow flex items-center justify-between px-4 gap-x-4 ">
        <div className={"flex items-center gap-x-4"}>
          <div onClick={() => nav("/")}>
            <BackIcon height={25} />
          </div>

          <h3 className="text-2xl">Manage Account</h3>
        </div>

        <div onClick={handleSignOut}>
          <LeaveIcon color={"#4F4F4F"} />
        </div>
      </div>

      <div className="flex flex-col gap-y-5 px-10">
        <TextInput
          type="First Name"
          padding={"px-3 py-4"}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextInput
          type="Last Name"
          padding={"px-3 py-4"}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextInput
          type="Email"
          padding={"px-3 py-4"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <AutoCompleteLocation value={location.name} onChange={handleLocation} />

        <div className="flex flex-col items-center">
          <div
            className="rounded-lg shadow-xl my-4 p-4 bg-white"
            style={{ height: "20vh" }}
          >
            <PreferencesList
              preferences={preferences}
              setPreferences={setPreferences}
              selectedPrefs={selectedPref}
              setSelectedPref={setSelectedPref}
            />
          </div>

          <div
            className="bg-hot-pink rounded-full px-5 py-3 text-white font-semibold text-lg flex gap-x-3 items-center justify-center w-56"
            onClick={() => setIsModalOpen(true)}
            style={{ zIndex: 30 }}
          >
            <AddIcon /> <h2>add preference</h2>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Add Preferences"}
        >
          <input
            type="text"
            className="border border-gray-300 focus:outline-none rounded-lg px-3 py-2 mb-4 w-full"
            placeholder="preferences"
            value={newPreference}
            onChange={(e) => setNewPreference(e.target.value)}
          />
          <div className="flex justify-end">
            <div
              className="bg-green text-white rounded-full px-4 py-2"
              onClick={addPreference}
            >
              add
            </div>
          </div>
        </Modal>
      </div>
      <div
        className="bg-lime font-semibold text-xl text-white rounded-full px-10 py-3"
        onClick={handleUpdate}
      >
        <h3>update</h3>
      </div>

      {(update && (
        <div className="absolute top-24 text-lime  opacity-50 font-semibold text-xl text-white rounded-lg px-20 py-3">
          <h3>updated successfully!</h3>
        </div>
      )) ||
        (!!error && (
          <div className="absolute top-24   opacity-50 font-semibold text-xl text-white rounded-lg px-20 py-3">
            <h3 className="text-red">{error}</h3>
          </div>
        ))}
    </div>
  );
}
