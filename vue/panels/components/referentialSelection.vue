<template>
  <div>
    <md-checkbox v-model="config.useAllDbIds"
                 @change="changeMode"
                 class="md-primary">
      Use whole digital twin
    </md-checkbox>

    <div v-show="!config.useAllDbIds">
      <md-button @click="addSelection">
        <md-icon>add</md-icon>
        <md-tooltip md-delay="300">Add selection to referential</md-tooltip>
      </md-button>

      <md-button @click="clearReferential">
        <md-icon>clear</md-icon>
        <md-tooltip md-delay="300">Clear referential</md-tooltip>
      </md-button>

      <md-button @click="showReferential">
        <md-icon>visibility</md-icon>
        <md-tooltip md-delay="300">Show referential</md-tooltip>
      </md-button>

      <p>{{getObjectsSelectedLength()}} objects selected</p>
    </div>
  </div>
</template>

<script>
import { bimObjectManagerService } from "spinal-env-viewer-bim-manager-service";
// import { getAllLeafDbIds, getLeafDbIds } from "../js/utilitiesDbIds";
export default {
  name: "referentialSelection",
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
        return bimObjectManagerService.getLeafDbIds(this.viewer.model);
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
      this.config.referential = [];
      const aggregateSelection = this.viewer.getAggregateSelection();

      for (let select of aggregateSelection) {
        let leafs = bimObjectManagerService.getLeafDbIds(
          select.model,
          select.selection
        );

        this.config.referential.push(leafs);
      }
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