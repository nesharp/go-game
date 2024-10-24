import { Eye } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { ViewMapKeys } from "../../../widgets/Area";
type ViewsChangerProps = {
  view: ViewMapKeys;
  setView: Dispatch<SetStateAction<ViewMapKeys>>;
};
export const ViewsChanger: FC<ViewsChangerProps> = ({ view, setView }) => {
  const onViewChange = () => {
    switch (view) {
      case "free":
        setView("top");
        break;
      case "top":
        setView("side");
        break;
      case "side":
        setView("free");
        break;
      default:
        break;
    }
  };
  return (
    <div className="absolute top-10 right-8 z-50 ">
      <button onClick={onViewChange}>
        <Eye className="h-10 w-10 text-gray-500 opacity-50 hover:opacity-100" />
      </button>
    </div>
  );
};
