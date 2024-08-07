import BackIcon from "../assets/icons/BackIcon";
import { TextInput } from "./utility_components";

export default function ManageAccount() {
  return (
    <div className="w-full h-full bg-base-white flex flex-col gap-y-16">
      <div className="bg-white h-20 w-full shadow flex items-center justify-start px-4 gap-x-4 ">
        <BackIcon height={25} />
        <h3 className="text-2xl">Manage Account</h3>

      </div>

      <div className="flex flex-col gap-y-5 px-10">
        <TextInput type="Username" padding={"px-3 py-4"}/>
        <TextInput type="Password" padding={"px-3 py-4"}/>
        <TextInput type="Location" padding={"px-3 py-4"}/>

      </div>
    </div>
  );
}
