import "./js/registerDialog";
import SpinalWindowSelection from "./js/createToolbar";
import FilterByLevelBtn from "./js/filterByLevelBtn";
import FilterPanelBtn from "./js/filterPanelBtn"


const TOOLBAR_GROUP_NAME = "spinalcom";

const EXTENSION_NAME = "spinal-viewer-filter";



const filterManager = SpinalWindowSelection({
  name: "spinal-filter-extension",
  icon: "filter_list_alt",
  label: "filter",
  subToolbarName: TOOLBAR_GROUP_NAME
}, [FilterByLevelBtn, FilterPanelBtn])


window.Autodesk.Viewing.theExtensionManager.registerExtension(
  EXTENSION_NAME,
  filterManager
);

window.spinal.ForgeExtentionManager.addExtention(EXTENSION_NAME);