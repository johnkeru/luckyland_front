import { useContext } from "react";
import { NavigationContext } from "../contexts/NavigationProvider";

export default () => useContext(NavigationContext);
// TO USE: const {currentPath, push, back} = useNavigation();
// currentPath = where the current path is.
// push        = to change to path.
// back        = go back where previous location at.