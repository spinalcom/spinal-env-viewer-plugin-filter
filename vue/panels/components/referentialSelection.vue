<template>
  <div>
    <md-checkbox v-model="config.useAllDbIds"
                 @change="changeMode"
                 class="md-primary">
      Use whole digital twin
    </md-checkbox>

    <div v-if="!config.useAllDbIds">
      <md-button @click="addSelection">
        <md-icon>add</md-icon>
        <md-tooltip md-delay="300">Add selection to referential</md-tooltip>
      </md-button>

      <!-- <md-button @click="addCategorySelected">
        <md-icon>add</md-icon>
        Add Category selected
        <md-tooltip md-delay="300">Add Category selected to referential
        </md-tooltip>
      </md-button> -->

      <md-button @click="clearReferential">
        <md-icon>clear</md-icon>
        <md-tooltip md-delay="300">Clear referential</md-tooltip>
      </md-button>

      <md-button @click="showReferential">
        <md-icon>visibility</md-icon>
        <md-tooltip md-delay="300">Show referential</md-tooltip>
      </md-button>

      <div class="historySelected">
        <table-component :bimSelected="config.referential"></table-component>
        <!--<p>{{getObjectsSelectedLength()}} objects selected</p>-->
      </div>
    </div>
  </div>
</template>

<script>
import { bimObjectManagerService } from "spinal-env-viewer-bim-manager-service";
import TableComponent from "./tableComponent.vue";
// import { getAllLeafDbIds, getLeafDbIds } from "../js/utilitiesDbIds";
export default {
  name: "referentialSelection",
  components: {
    "table-component": TableComponent
  },
  props: {
    // update: {
    //   type: String,
    //   required: true
    // },
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    this.viewer = window.spinal.ForgeViewer.viewer;
    this.allDbIds = (() => {
      try {
        return this.viewer.getVisibleModels().map(el => {
          return bimObjectManagerService.getLeafDbIds(el);
        });
      } catch (error) {
        return [bimObjectManagerService.getLeafDbIds(this.viewer.model)];
      }
    })();

    return {};
  },
  //   watch: {
  //     update: {
  //       immediate: true,
  //       handler() {
  //         if (this.update != "opened") {
  //           return;
  //         }
  //         if (this.config.useAllDbIds) {
  //           this.config.referential = this.allDbIds.slice();
  //         }
  //       }
  //     }
  //   },
  mounted() {
    this.config.referential = this.allDbIds;
  },
  methods: {
    /**
     * Updates the referential when the mode changes.
     */
    changeMode(newValue) {
      if (!newValue) {
        this.clearReferential();
      } else {
        this.config.referential = this.allDbIds;
      }
      //   this.$emit("configChanged");
    },
    /**
     * Adds the current selection to the referential. Discards all non-leaf dbIds.
     */
    addSelection() {
      if (this.config.useAllDbIds) this.config.referential = [];
      const aggregateSelection = this.viewer.getAggregateSelection();
      let referentialCopy = Object.assign([], this.config.referential);

      for (let select of aggregateSelection) {
        // let leafs = bimObjectManagerService.getLeafDbIds(
        //   select.model,
        //   select.selection
        // );

        let found = referentialCopy.find(el => el.model.id === select.model.id);

        if (found) {
          found.selection.push(...select.selection);
        } else {
          referentialCopy.push(select);
        }
      }

      this.config.referential = referentialCopy;

      //   this.config.referential = [...new Set(this.config.referential)];
      //   this.$emit("configChanged");
    },

    /**
     * Empties the referential.
     */
    clearReferential() {
      this.config.referential = [];
      //   this.$emit("configChanged");
    },
    /**
     * Selects all the dbIds in the referential.
     */
    showReferential() {
      this.config.referential.forEach(el => {
        this.viewer.impl.selector.setSelection(el.selection, el.model);
      });
    },
    getObjectsSelectedLength() {
      let length = 0;

      this.config.referential.forEach(el => {
        length += el.selection.length;
      });

      return length;
    }
  }
};
</script>

<style scoped>
.historySelected {
  height: 150px;
  margin-top: 20px;
  /* margin-left: 30px; */
  color: green;
  font-size: 20px;
}
</style>