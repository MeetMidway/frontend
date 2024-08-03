import "./screenstyles.css";
import Logo from "../assets/images/logo.svg";
import Google from "../assets/images/google.svg";
import AccountIcon from "../assets/icons/AccountIcon";
import LockIcon from "../assets/icons/LockIcon";
import { Link } from "react-router-dom";
import ArrowRight from "../assets/icons/ArrowRightIcon";
import BlueSwig from "../assets/images/auth-swiggles/BlueSwig";
import DarkBlueSwig from "../assets/images/auth-swiggles/DarkBlueSwig";
import YellowSwig from "../assets/images/auth-swiggles/YellowSwig";
import RedSwig from "../assets/images/auth-swiggles/RedSwig";
import { useState } from "react";

function AuthView() {

  const [animate, setAnimate] = useState(false);

  const signIn = () => {
    setAnimate(true);
    console.log()
  
  };


  const TextInput = ({ type }) => {
    return (
      <div
        className={`flex bg-white rounded-full gap-x-1 p-3 w-full shadow-lg items-center`}
      >
        <div>
          {(type === "Username" && <AccountIcon width={25} height={24} />) ||
            (type === "Password" && <LockIcon width={25} height={18} />)}
        </div>

        <input
          type="text"
          placeholder={type}
          className="placeholder-gray-200 focus:outline-none text-gray-300 w-full"
        />
      </div>
    );
  };



  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative">
      <div style={{zIndex: 10}} className="bg-gray-100 h-5/6 w-5/6 rounded-sm bg-shw flex flex-col justify-between items-center pb-10 pt-28">
        <div className="flex flex-col items-center gap-y-3 mb-5">
          <div className="flex flex-col items-center gap-y-3">
            <div
              style={{ backgroundImage: `url(${Logo})` }}
              className="bg-contain bg-no-repeat h-20 w-72"
            />
            <div className="flex items-center gap-5 bg-white rounded-md px-6 py-4 shw">
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
            <h3 className="uppercase font-semibold text-gray-600 text-sm">
              or
            </h3>
            <h3 className="text-lg font-semibold tracking-wider">
              login using your details below
            </h3>
          </div>
        </div>

        <div className="flex flex-col items-center w-5/6 gap-y-4 mb-8">
          <TextInput type={"Username"} />
          <TextInput type={"Password"} />
          <div className="w-full flex justify-end">
            <Link>
              <h3 className="text-gray-300">Forgot your password?</h3>
            </Link>
          </div>

         
        </div>
        <div className="w-3/4 flex justify-end items-center gap-x-3">
          <h3 className="font-semibold text-2xl">Sign in</h3>

           {/* placeholder as zindex issues */}
          <div className="bg-green rounded-full px-5 py-2 invisible">
            <ArrowRight />
          </div>
        </div>

        <div className="mt-10">
          <h3>
            Don't have an account?{" "}
            <span>
              <a
                href="put link"
                target="_blank"
                className="underline font-semibold text-utility-blue"
              >
                Create
              </a>
            </span>
          </h3>
        </div>
      </div>

      <div className={`bg-green rounded-full px-5 py-2 absolute`} onClick={signIn} style={{zIndex:25, bottom: "21vh", right: "5.5rem" }}>
            <ArrowRight />
          </div>
      <div className={`absolute -top-20 ${animate && "move-out-top"}`} style={{zIndex: 20}} >
      <BlueSwig />
      </div>
      <div className={`absolute -top-10 -right-24 ${animate && "move-out-right"}`} style={{zIndex: 1}}>
        <DarkBlueSwig />
        </div>

        <div className={`absolute -bottom-36 -right-56 ${animate && "move-out-right"}`} style={{zIndex: 20}}>
          <YellowSwig />
        </div>

        <div className={`absolute -left-16 -bottom-16 ${animate && "move-out-bottom"}`} style={{zIndex: 1}}>
          <RedSwig />
        </div>
     
     
    </div>
  );
}

export default AuthView;
