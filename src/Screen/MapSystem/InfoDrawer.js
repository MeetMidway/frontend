import RouteIcon from "../../assets/icons/RouteIcon.js";
import GoIcon from "../../assets/icons/GoIcon.js";
import LeaveIcon from "../../assets/icons/LeaveIcon.js";

export default function InfoDrawer({
  drawer,
  title,
  subtext,
  stage,
  onClickButton,
  icon_active,
  exitButton,
}) {
  return (
    <div
      className="bg-white w-full h-20 flex relative px-4 pt-4"
      style={{ zIndex: 30 }}
    >
      <div className="">
        <h3 className="text-xl tracking-wide">Test</h3>
        <h3 className="tracking-wide text-gray-300">Test</h3>
      </div>
      <div
        className={`rounded-full ${
          (stage === 1 && !icon_active && "bg-disabled-purple") ||
          (stage === 1 && "bg-purple") ||
          (stage >= 2 && "bg-utility-blue")
        } h-16 w-16 absolute right-5 -top-7 shadow-xl flex items-center justify-center`}
        onClick={
          (icon_active && stage < 3 && onClickButton) ||
          (stage === 3 && exitButton)
        }
      >
        {(stage === 1 && <RouteIcon />) ||
          (stage === 2 && <GoIcon />) ||
          (stage === 3 && <LeaveIcon />)}
      </div>
    </div>
  );
}
