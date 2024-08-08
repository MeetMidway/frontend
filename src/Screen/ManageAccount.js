import BackIcon from "../assets/icons/BackIcon";
import { UserContext } from "../contexts/UserProvider";
import { TextInput } from "./utility_components";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import {updateEmail, signOut} from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import {checkFields} from "../Firebase/firebaseFuncs"
import AsyncStorage from "@react-native-async-storage/async-storage";
import LeaveIcon from "../assets/icons/LeaveIcon"


export default function ManageAccount() {
  const nav = useNavigate();

  const [user] = useContext(UserContext);
  const [email, setEmail] = useState(user?.email);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [location, setLocation] = useState(user?.location);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  async function handleUpdate() {
    if (checkFields({email, firstName, lastName, location})) {
      setLoading(true)
      const data = {
        first_name: firstName,
        lastName: lastName,
        email: email,
        location: location,
        preferences: [],
      };
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
            // An error occurred
            // ...
          });
      }

      console.log("update")
    } else {
      setError(true)
    }
   
  }

  async function handleSignOut() {
    signOut(auth)
      .then(() => {
        AsyncStorage.removeItem("password")
        AsyncStorage.removeItem("email")
        nav("/")
      })
      .catch((error) => {

        console.error("Error signing out:", error);
      });
  }

  return (
    <div className="w-full h-full bg-base-white flex flex-col gap-y-16">
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
        <TextInput type="First Name" padding={"px-3 py-4"} value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        <TextInput type="Last Name" padding={"px-3 py-4"} value={lastName} onChange={(event) => setLastName(event.target.value)} />
        <TextInput type="Email" padding={"px-3 py-4"} value={email} onChange={(event) => setEmail(event.target.value)} />
        <TextInput type="Location" padding={"px-3 py-4"} value={location} onChange={(event) => setLocation(event.target.value)} />
      </div>
    </div>
  );
}
