import { useRef, useEffect } from "react";
import RouteIcon from "../../assets/icons/RouteIcon";

const AutoCompleteLocation = ({
  onChange,
  value,
  placeholder,
  disabled,
  idx=0,
}) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ca" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current.getPlace();
      const address = place?.name || "";
      const latLong = place?.geometry.location

      // Update the input's value directly
      if (inputRef.current) {
        inputRef.current.value = address;

        console.log(latLong)
        // Directly call the onChange handler with the address and index
        console.log(inputRef)
        const data = {"name": address, location: {lat: latLong.lat(), lng: latLong.lng()}}
        onChange(data, idx);
      }
    });
  }, [idx]);

  return (
    <div
      className={
        placeholder
          ? "border-[1px] rounded-md flex justify-center px-2 w-2/3"
          : `flex bg-white rounded-full gap-x-1 p-3 w-full shadow-lg items-center`
      }
    >
      <div className={placeholder && "hidden"}>
        <RouteIcon width={25} color={"#9A9A9A"} />
      </div>

      <input
        type="text"
        placeholder={placeholder || "Location"}
        className={`placeholder-gray-200 focus:outline-none text-gray-300 ${
          placeholder || "text-lg"
        } w-full`}
        onChange={(e) => onChange(e.target.value, idx)}
        value={value} // This is controlled now by the parent
        disabled={disabled}
        ref={inputRef}
        onClick={(e) => onChange(e.target.value, idx)}
        autoComplete={false}
      />
    </div>
  );
};

export default AutoCompleteLocation;
