import {
  spinalPanelManagerService
} from "spinal-env-viewer-panel-manager-service";

import createBtn from "./createBtn";

export default (function() {

  return createBtn("Filter By Level", "location_city", () => {
    spinalPanelManagerService.openPanel("filterByLevelDialog", {});
  })

})();