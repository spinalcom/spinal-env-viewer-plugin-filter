import vue from "vue";
//Dialogs
import filterByLevelDialog from "../vue/dialogs/filterByLevelDialog.vue";
import advancedParamsDialog from "../vue/dialogs/advancedParamsDialog.vue";


//Panels
import filterPanel from "../vue/panels/filterPanel.vue";


const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");

const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");

const dialogs = [{
    name: "filterByLevelDialog",
    vueMountComponent: vue.extend(filterByLevelDialog),
    parentContainer: document.body
  },
  {
    name: "advancedParamsDialog",
    vueMountComponent: vue.extend(advancedParamsDialog),
    parentContainer: document.body
  }
];

for (let index = 0; index < dialogs.length; index++) {
  SpinalMountExtention.mount(dialogs[index]);
}

///////////////////////////////////////////////////////////////////////////
//                     REGISTER PANEL                                    //
///////////////////////////////////////////////////////////////////////////

let panels = [{
  name: "filterPanel",
  vueMountComponent: vue.extend(filterPanel),
  panel: {
    title: "Filter By Attribute",
    closeBehaviour: "hide"
  },
  style: {
    height: "475px",
    left: "400px"
  }
}]

for (let index = 0; index < panels.length; index++) {
  const element = panels[index];
  const panelExtension = SpinalForgeExtention.createExtention(element);
  SpinalForgeExtention.registerExtention(element.name, panelExtension);
}