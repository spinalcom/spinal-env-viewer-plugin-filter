<template>
  <div>
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
      loading...
    </div>

  </div>
</template>



<script>
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
        // callback: argParam => {
        //   this.data.map(el => {
        //     console.log(
        //       el.id,
        //       "name =>",
        //       el.config.name,
        //       "value =>",
        //       el.config.value
        //     );
        //   });
        // }
      });
    },

    filter(regex) {
      let regExp = regex.filter(el => {
        return typeof el.nameRegex !== "undefined";
      });

      if (regExp.length > 0) {
        this.loaded = true;

        bimObjectManagerService
          .getBimObjectsValidated(this.config.referential, regExp)
          .then(res => {
            res = res.map(el => {
              return {
                model: el.model,
                ids: el.properties.map(el2 => el2.dbId)
              };
            });

            window.spinal.ForgeViewer.viewer.impl.selector.setAggregateSelection(
              res
            );

            this.loaded = false;
          });
      } else {
        alert("Please add a valid filter");
      }
    }
  }
};
</script>

<style scoped>
</style>
