<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)">
    <md-dialog-title>Filter By Level</md-dialog-title>

    <md-dialog-content>
      <md-field>
        <label>Level Number</label>
        <md-input v-model="inputValue"
                  autofocus></md-input>
      </md-field>

    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog(false)">Close</md-button>
      <md-button class="md-primary"
                 @click="closeDialog(true)"
                 :disabled="isDisabled()">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>


<script>
import { bimObjectManagerService } from "spinal-env-viewer-bim-manager-service";

export default {
  name: "filterByLevelDialog",
  props: ["onFinised"],
  data() {
    return {
      showDialog: true,
      inputValue: ""
    };
  },
  methods: {
    opened() {},
    removed(closed) {
      if (closed) {
        bimObjectManagerService
          .getBimObjectsByPropertiesName(
            window.spinal.ForgeViewer.viewer.model,
            "Level",
            this.inputValue
          )
          .then(res => {
            console.log(res);

            res = res.map(el => el.dbId);
            window.spinal.ForgeViewer.viewer.select(res);
          });
      }
      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised(closeResult);
      }
    },
    isDisabled() {
      return (
        this.inputValue.length === 0 ||
        !new RegExp(/^\d+$/).test(this.inputValue.trim())
      );
    }
  }
};
</script>