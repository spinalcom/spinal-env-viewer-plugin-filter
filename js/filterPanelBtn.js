import {
  spinalPanelManagerService
} from "spinal-env-viewer-panel-manager-service";

import createBtn from "./createBtn";

export default (function() {

  return createBtn("Filter Panel", "filter_list", () => {
    spinalPanelManagerService.openPanel("filterPanel", {});
  })

})();