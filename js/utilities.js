import { serviceDocumentation } from "spinal-env-viewer-plugin-documentation-service";
import bimobjectservice from "spinal-env-viewer-plugin-bimobjectservice";

const utilities = {
  getValidatedBimOnSpinalAttribut(argModel, argRegex) {
    return argModel.map(async element => {
      return {
        model: element.model,
        valid: (await Promise.all(
          element.selection.map(dbId => {
            return this._isValid(dbId, argRegex).then(isValid => {
              if (isValid) return dbId;
              return;
            });
          })
        )).filter(el => typeof el !== "undefined")
      };
    });
  },

  _isValid(dbId, argRegex) {
    return bimobjectservice.getBIMObject(dbId).then(bimNode => {
      if (typeof bimNode === "undefined") return false;

      return serviceDocumentation.getAllAttributes(bimNode).then(res => {
        res = res.map(el => {
          return {
            label: el.label.get().trim(),
            value: el.value.get().trim()
          };
        });

        return this._execRegex(res, argRegex);
      });
    });
  },

  _execRegex(el, argRegex) {
    for (let i = 0; i < argRegex.length; i++) {
      let nameRegex = argRegex[i].nameRegex;
      let valueRegex = argRegex[i].valueRegex;

      let found = el.find(res => {
        if (typeof valueRegex === "undefined") {
          return nameRegex.test(res.label);
        }

        return nameRegex.test(res.label) && valueRegex.test(res.value);
      });

      if (typeof found === "undefined") {
        return false;
      }
    }

    return true;
  }
};

export default utilities;
