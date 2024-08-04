import "./nav.css";
import CheckIcon from "../../assets/icons/CheckIcon";

export default function MidwayNav({ steps, numSteps }) {
  const Step = ({ stepCompleted, step }) => {
    return (
      <div className="flex flex-col items-center gap-y-1 relative" style={{zIndex:20}}>
        <div className="circle-shadow bg-base-white rounded-full h-12 w-12 flex justify-center items-center">
          {stepCompleted ? (
            <div className="bg-utility-blue rounded-full h-8 w-8 flex items-center justify-center">
              <CheckIcon color={"white"} />
            </div>
          ) : (
            <div className="border-utility-blue border-[6px] rounded-full h-8 w-8" />
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-1">
          <div class="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[8px] border-b-utility-blue" />

          <div className="bg-utility-blue rounded-full px-2 py-1 button-shadow">
            <h3 className="text-white text-lg font-bold">{step}</h3>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={`flex relative w-full ${numSteps && "justify-between" || "justify-center"} px-28`}>
      <Step stepCompleted={steps[0].stepCompleted} step={steps[0].step} />
      {numSteps && (
        <>
          <div
            className="bg-utility-blue h-2 w-32 absolute"
            style={{
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Step stepCompleted={steps[1].stepCompleted} step={steps[1].step} />
        </>
      )}
    </div>
  );
}
