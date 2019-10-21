<template>
  <div style="height : 100%">
    <md-steppers id="steppers"
                 style="width : 100%; height : 100%; overflow : hidden"
                 md-vertical
                 :md-active-step.sync="activeStep"
                 v-if="!loaded">
      <md-step id="ref"
               md-label="Choose referential">
        <referential-selection :config="config"></referential-selection>
      </md-step>

      <md-step id="layout"
               md-label="add proprieties">

        <filter-form-component :data="data"
                               :loaded="loaded"
                               @add="addProperty"
                               @reset="reset"
                               @delete="deleteItem"
                               @config="advanced"></filter-form-component>

      </md-step>

      <md-step id="launch"
               md-label="Launch the Search">
        <launch-search-component :data="data"
                                 @filter="filter"></launch-search-component>
      </md-step>

    </md-steppers>

    <div v-if="loaded"
         class="isLoaded">
      <md-progress-spinner class="spiner"
                           md-mode="indeterminate"></md-progress-spinner>
    </div>

  </div>
</template>



<script>
import utilities from "../../js/utilities";

import { bimObjectManagerService } from "spinal-env-viewer-bim-manager-service";

import { spinalPanelManagerService } from "spinal-env-viewer-panel-manager-service";

import filterFormComponent from "./components/filterForm.vue";
import referentialSelection from "./components/referentialSelection.vue";
import launchSearchComponent from "./components/launchSearch.vue";

const PROPERTY_MODEL = {
  id: 1,
  name: "",
  value: "",
  required: false,
  config: {
    name: {
      option: "1",
      regex: undefined,
      flag: []
    },
    value: {
      option: "1",
      regex: undefined,
      flag: []
    }
  }
};

export default {
  name: "filterPanel",
  components: {
    "filter-form-component": filterFormComponent,
    "referential-selection": referentialSelection,
    "launch-search-component": launchSearchComponent
  },
  data() {
    return {
      data: [Object.assign({}, PROPERTY_MODEL)],
      loaded: false,
      activeStep: "",
      config: { useAllDbIds: true, referential: [] }
    };
  },
  methods: {
    opened() {
      this.activeStep = "ref";
    },

    addProperty() {
      let obj = {
        id: 1,
        name: "",
        value: "",
        required: false,
        config: {
          name: {
            option: "1",
            regex: undefined,
            flag: []
          },
          value: {
            option: "1",
            regex: undefined,
            flag: []
          }
        }
      };

      obj.id = this.data[this.data.length - 1].id + 1;

      this.data.push(obj);
    },
    reset() {
      this.data = [PROPERTY_MODEL];
    },
    deleteItem(item) {
      this.data = this.data.filter(el => el.id !== item.id);
    },

    advanced(item) {
      spinalPanelManagerService.openPanel("advancedParamsDialog", {
        params: item
      });
    },

    getBimObjectNotValid(model, bimValidated) {
      let found = this.config.referential.find(el => {
        return el.model.id === model.id;
      });

      if (typeof found !== "undefined") {
        return found.selection.filter(el => {
          return bimValidated.indexOf(el) === -1;
        });
      }

      return [];
    },

    checkOnSpinalAttributes(activated, regExp) {
      let leaftBims = this.config.referential.map(select => {
        return bimObjectManagerService.getLeafDbIds(
          select.model,
          select.selection
        );
      });

      if (!activated) return Promise.resolve(leaftBims);

      let promises = utilities.getValidatedBimOnSpinalAttribut(
        leaftBims,
        regExp
      );

      return Promise.all(promises).then(res => {
        return res.map(el => {
          el["selection"] = this.getBimObjectNotValid(el.model, el.valid);
          return el;
        });
      });
    },

    checkOnBimAttributes(activated, bimValidated, regExp) {
      if (!activated) return Promise.resolve(bimValidated);

      return bimObjectManagerService
        .getBimObjectsValidated(this.config.referential, regExp)
        .then(res => {
          return res.map(el => {
            let found = bimValidated.find(el2 => {
              return el.model.id === el2.model.id;
            });

            return {
              model: el.model,
              ids:
                typeof found !== "undefined"
                  ? [...el.properties.map(el2 => el2.dbId), ...found.ids]
                  : el.properties.map(el2 => el2.dbId)
            };
          });
        });
    },

    filter(params) {
      let regExp = params.regex.filter(el => {
        return typeof el.nameRegex !== "undefined";
      });

      if (regExp.length > 0) {
        // this.loaded = true;
        // // let bimValidated = this.config.referential.map(el => {
        // //   return {
        // //     model: el.model,
        // //     ids: []
        // //   };
        // // });

        this.checkOnSpinalAttributes(params.spinalAttributes, regExp)
          .then(values => {
            let bimValidated = values.map(el => {
              return { model: el.model, ids: el.valid ? [...el.valid] : [] };
            });

            this.checkOnBimAttributes(
              params.bimAttributes,
              bimValidated,
              regExp
            )
              .then(res => {
                try {
                  window.spinal.ForgeViewer.viewer.impl.selector.setAggregateSelection(
                    res
                  );
                } catch (err) {
                  let ids = [];
                  res.forEach(el => {
                    ids = [...el.ids];
                  });

                  window.spinal.ForgeViewer.viewer.select(ids);
                }

                // this.loaded = false;
              })
              .catch(err => {
                console.error(err);
                // this.loaded = false;
              });
          })
          .catch(err => {
            console.error(err);
            // this.loaded = false;
          });

        // this.loaded = true;
        /*
        bimObjectManagerService
          .getBimObjectsValidated(this.config.referential, regExp)
          .then(res => {
            res = res.map(el => {
              return {
                model: el.model,
                ids: el.properties.map(el2 => el2.dbId)
              };
            });

            try {
              window.spinal.ForgeViewer.viewer.impl.selector.setAggregateSelection(
                res
              );
            } catch (err) {
              let ids = [];
              res.forEach(el => {
                ids = [...el.ids];
              });

              window.spinal.ForgeViewer.viewer.select(ids);
            }

            this.loaded = false;
          });



      */
      } else {
        alert("Please add a valid filter");
      }
    }
  }
};
</script>

<style scoped>
.isLoaded {
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
}

.spiner {
  position: absolute;
  top: calc(50% - 30px);
  right: calc(50% - 30px);
}
</style>
