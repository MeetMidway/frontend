import OptionsIcon from "../assets/icons/OptionsIcon";
import RemoveIcon from "../assets/icons/RemoveIcon";
import PinIconOutline from "../assets/icons/PinIcons/PinIconOutline";

export const AddressInput = ({
  type,
  color,
  removeAddress,
  onChange,
  disableRemove,
}) => {
  const PathImg = () => {
    return (
      <svg
        width="2"
        height="19"
        viewBox="0 0 2 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L1 18"
          stroke="#585858"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="1 4"
        />
      </svg>
    );
  };
  return (
    <div className="flex justify-center h-12 gap-x-2 mb-1">
      <div className="flex justify-center relative">
        {(type === "self" && (
          <div className="flex flex-col items-center justify-center gap-y-1">
            <div className="shadow-lg border bg-white h-6 w-6 rounded-full flex justify-center items-center">
              <div className="bg-utility-blue rounded-full h-4 w-4" />
            </div>
            <div className="absolute -bottom-3">
              <PathImg />
            </div>
          </div>
        )) || (
          <div className="flex flex-col items-center justify-center">
            <PinIconOutline color={color} />
          </div>
        )}
      </div>

      <div className="border-[1px] rounded-md flex justify-center px-2 w-2/3">
        <input
          type="text"
          placeholder={
            (type === "self" && "Your Address") || "Enter Friend's Address"
          }
          className="placeholder-gray-200 focus:outline-none w-full bg-white"
          onChange={onChange}
          disabled={disableRemove}
        />
      </div>

      <div className="flex justify-center items-center">
        {(type === "self" && <OptionsIcon />) || (
          <div
            className={`${disableRemove && "invisible"}`}
            onClick={removeAddress}
          >
            <RemoveIcon />
          </div>
        )}
      </div>
    </div>
  );
};
