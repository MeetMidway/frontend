import "./screenstyles.css";
import Logo from "../assets/images/logo.svg";
import Google from "../assets/images/google.svg";

import { Link, useNavigate } from "react-router-dom";
import ArrowRight from "../assets/icons/ArrowRightIcon";
import BlueSwig from "../assets/images/auth-swiggles/BlueSwig";
import DarkBlueSwig from "../assets/images/auth-swiggles/DarkBlueSwig";
import YellowSwig from "../assets/images/auth-swiggles/YellowSwig";
import RedSwig from "../assets/images/auth-swiggles/RedSwig";
import { TextInput } from "./utility_components";
import { useState, useContext } from "react";
import { useEffect } from "react";

import AutoCompleteLocation from "./MapSystem/AutoCompleteLocation";
import { signIn, signInWithGoogle, signUp } from "../Firebase/firebaseFuncs";
import { UserContext } from "../contexts/UserProvider";

function AuthView() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const [error, setError] = useState("");
  const [auth, setAuth] = useState("");
  const [user] = useContext(UserContext);

  const [isLogin, setIsLogin] = useState(true);

  //data set
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLocation = (val, idx) => {
    setLocation(val)
  }

  useEffect(() => {
    if (user) {
      navigate(user?.signInFirstTime ? "/add-preferences" : "/");
    }
  }, [user]);

  console.log(location)

  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative">
      <div
        style={{ zIndex: 10 }}
        className="bg-gray-100 h-5/6 w-5/6 rounded-sm bg-shw flex flex-col justify-between items-center pb-10 pt-28"
      >
        <div className="flex flex-col items-center gap-y-3 mb-5">
          <div className="flex flex-col items-center gap-y-3">
            <div
              style={{ backgroundImage: `url(${Logo})` }}
              className="bg-contain bg-no-repeat h-20 w-72"
            />
            <div
              className={`flex items-center gap-5 bg-white rounded-md px-6 py-4 shw ${
                !isLogin && "hidden"
              }`}
              onClick={() => signInWithGoogle()}
              style={{ cursor: "pointer" }}
            >
              <div className="bg-white shw rounded-full flex items-center p-2">
                <div
                  style={{ backgroundImage: `url(${Google})` }}
                  className="bg-contain bg-no-repeat h-12 w-12"
                />
              </div>
              <h3 className="font-bold text-xl">Sign in with Google</h3>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {(isLogin && (
              <>
                <h3 className="uppercase font-semibold text-gray-600 text-sm">
                  or
                </h3>
                <h3 className="text-lg font-semibold tracking-wider">
                  login using your details below
                </h3>
              </>
            )) || (
              <h3 className="font-semibold text-gray-400 text-xl">
                Enter your details
              </h3>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center w-5/6 gap-y-4 mb-8 relative">
          {error && (
            <p
              className={`absolute ${isLogin ? "-top-7" : "-top-16"}
           text-red text-xs`}
            >
              {error}
            </p>
          )}

          {!isLogin && (
            <div className="flex gap-x-3">
              <TextInput
                type="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <TextInput
                type="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          )}
          <TextInput
            type="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextInput
            type="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {!isLogin && (
            // <TextInput
            //   type="Location"
            //   value={location}
            //   onChange={(event) => setLocation(event.target.value)}
            // />

            <AutoCompleteLocation value={location.name} onChange={handleLocation} />
          )}
          <div className="w-full flex justify-end">
            <Link>
              <h3 className="text-gray-300">
                {isLogin ? "Forgot your password?" : "Ready to MeetMidway?"}
              </h3>
            </Link>
          </div>
        </div>
        <div className="w-3/4 flex justify-end items-center gap-x-3">
          <h3 className="font-semibold text-2xl">
            {isLogin ? "Sign in" : "Create Account"}
          </h3>
          {/* placeholder as zindex issues */}
          <div
            className="bg-green rounded-full px-5 py-2 invisible"
            style={{ cursor: "pointer" }}
          >
            <ArrowRight />
          </div>
        </div>

        <div className="mt-10 flex invisible">
          <h3>
            Don't have an account?
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="underline font-semibold text-utility-blue"
            >
              Create
            </span>
          </h3>
        </div>
      </div>

      <div
        className="mt-10 flex absolute"
        style={{ zIndex: 25, bottom: "11vh" }}
      >
        <h3>
          {isLogin ? "Don't have an account?" : "Have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="underline font-semibold text-utility-blue"
          >
            {isLogin ? "Create" : "Login"}
          </span>
        </h3>
      </div>

      <div
        className={`bg-green rounded-full px-5 py-2 absolute`}
        onClick={
          isLogin
            ? () =>
                signIn({
                  email,
                  password,
                  error,
                  setError,
                })
            : () =>
                signUp({
                  email,
                  password,
                  firstName,
                  lastName,
                  location,
                  error,
                  setError,
                })
        }
        style={{
          zIndex: 25,
          bottom: `${isLogin ? "22.5vh" : "21.5vh"}`,
          right: "5.5rem",
        }}
      >
        <ArrowRight />
      </div>

      <div className={`absolute move-in-top -top-20`} style={{ zIndex: 20 }}>
        <BlueSwig />
      </div>
      <div
        className={`absolute move-in-top -top-10 -right-24 `}
        style={{ zIndex: 1 }}
      >
        <DarkBlueSwig />
      </div>

      <div
        className={`absolute move-in-bottom -bottom-36 -right-56 `}
        style={{ zIndex: 20 }}
      >
        <YellowSwig />
      </div>

      <div
        className={`move-in-bottom absolute -left-16 -bottom-16 $`}
        style={{ zIndex: 1 }}
      >
        <RedSwig />
      </div>
    </div>
  );
}

export default AuthView;
