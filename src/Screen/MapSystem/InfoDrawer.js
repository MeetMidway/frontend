import Draggable from "react-draggable";
import RouteIcon from "../../assets/icons/RouteIcon.js";
import GoIcon from "../../assets/icons/GoIcon.js";
import LeaveIcon from "../../assets/icons/LeaveIcon.js";
import "./drawer.css";
import { useEffect, useState } from "react";

export default function InfoDrawer({
  drawer,
  title,
  subtext,
  stage,
  onClickButton,
  icon_active,
  exitButton,
  children,
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e, ui) => {
    setPosition({ x: 0, y: ui.y });
  };

  const handleStop = (e, ui) => {
    // Snap to top if dragged past a certain point
    console.log(ui.y);
    if (ui.y < -50) {
      setPosition({ x: 0, y: -120 });
    } else {
      setIsDragging(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const ItineraryItem = () => {
    return (
      <div className="flex flex-row w-full gap-x-3">
        <div className="bg-base-white h-20 w-20" />
        <div className="flex flex-col">
          <h3 className="text-2xl">title</h3>
          <div className="flex flex-row">
            <h3>4.6</h3> <div></div>
          </div>
          <h3 className="text-gray-300 text-sm">address</h3>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log("isDragging state changed:", isDragging);
  }, [isDragging]);
  return (
    <Draggable
      axis="y"
      position={position}
      onDrag={handleDrag}
      onStop={handleStop}
      disabled={stage !== 2 || !isDragging}
    >
      <div
        className={`w-full flex flex-col ${
          (isDragging && position.y < -20 && "h-0") || "h-28"
        } relative`}
        style={{ zIndex: 30 }}
      >
        <div className="w-full flex flex-col absolute drawer-shadow">
          <div
            className={`bg-white w-full flex flex-col relative"
        px-4 pt-4 `}
            style={{
              zIndex: 10,
              height: `${(position.y < -50 && `20rem`) || "5rem"}`,
            }}
          >
            <div className="flex w-2/3 justify-between">
              <div>
                <h3 className="text-xl tracking-wide">Test</h3>
                <h3 className="tracking-wide text-gray-300">Test</h3>
              </div>
              {stage === 2 && (
                <div
                  className="bg-gray-200 h-1 w-32 rounded-full"
                  onClick={() => setIsDragging(true)}
                />
              )}
              <div
                className={`rounded-full ${
                  (stage === 1 && !icon_active && "bg-disabled-purple") ||
                  (stage === 1 && "bg-purple") ||
                  (stage >= 2 && "bg-utility-blue")
                } h-16 w-16 absolute right-5 -top-7 shadow-xl flex items-center justify-center`}
                onClick={() => {
                  if (icon_active && stage < 3) {
                    onClickButton?.(); // Ensure this is a function if provided
                  } else if (stage === 3) {
                    exitButton?.(); // Ensure this is a function if provided
                  }
                }}
                
              >
                {(stage === 1 && <RouteIcon />) ||
                  (stage === 2 && <GoIcon />) ||
                  (stage === 3 && <LeaveIcon />)}
              </div>
              {children}
            </div>

            <div className="w-full overflow-y-auto mt-4">
              <ItineraryItem />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
