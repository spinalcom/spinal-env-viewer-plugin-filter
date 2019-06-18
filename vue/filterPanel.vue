<template>
  <div style="width : 100%; height : 100%; overflow : hidden">
    <div class="_container"
         v-if="!loaded">
      <div class="header">

        <md-button class="_btn md-dense md-primary"
                   @click="addProperty">
          <md-icon>add</md-icon>
          ADD PROPERTY
        </md-button>

        <md-button class="_btn md-dense md-primary"
                   @click="reset">
          <md-icon>restore</md-icon>
          RESET
        </md-button>

        <md-button class="_btn md-dense md-primary"
                   @click="filter">
          <md-icon>check</md-icon>
          SEARCH
        </md-button>

      </div>

      <md-content class="content md-scrollbar">

        <div class="md-layout md-gutter"
             v-for="item in data"
             :key="item.id">
          <div class="md-layout-item md-small-size-100">
            <md-field class="_mdField">
              <label>Name</label>
              <md-input v-model="item.name"
                        palceholder="Name"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field class="_mdField">
              <label>Value</label>
              <md-input v-model="item.value"
                        palceholder="Value"></md-input>
            </md-field>
          </div>
          <!-- <div class="md-layout-item md-size-10"></div> -->

          <div class="md-layout-item md-small-size-100 iconButton">

            <md-button class="md-icon-button"
                       title="config">
              <md-icon class="_icon">tune</md-icon>
            </md-button>

            <md-button class="md-icon-button"
                       title="remove"
                       v-if="item.id !== 1"
                       @click="deleteItem(item)">
              <md-icon class="_icon">clear</md-icon>
            </md-button>
          </div>

        </div>
      </md-content>

    </div>

    <div class="_container"
         v-if="loaded">
      <md-content class="content2"
                  v-if="loaded">
        loading...
      </md-content>
    </div>
  </div>
</template>



<script>
const PROPERTY_MODEL = {
  id: 1,
  name: "",
  value: "",
  required: false
};

import { bimObjectManagerService } from "spinal-env-viewer-bim-manager-service";

export default {
  name: "filterPanel",
  data() {
    return {
      data: [Object.assign({}, PROPERTY_MODEL)],
      loaded: false
    };
  },
  methods: {
    opened() {},
    addProperty() {
      let obj = Object.assign({}, PROPERTY_MODEL);
      obj.id = this.data[this.data.length - 1].id + 1;

      this.data.push(obj);
    },
    reset() {
      this.data = [PROPERTY_MODEL];
    },
    deleteItem(item) {
      this.data = this.data.filter(el => el.id !== item.id);
    },
    filter() {
      this.loaded = true;
      bimObjectManagerService
        .getBimObjectsByPropertiesName(
          window.spinal.ForgeViewer.viewer.model,
          this.data
        )
        .then(res => {
          res = res.map(el => el.dbId);
          window.spinal.ForgeViewer.viewer.select(res);
          this.loaded = false;
        });
    }
  }
};
</script>

<style>
._container {
  width: 100%;
  height: 100%;
}

._container .header {
  width: 100%;
  height: calc(10%);
  display: flex;
  flex-direction: row;
  justify-content: center;
}

._container .header ._btn {
  padding-right: 10px;
  border: 1px solid #448aff;
}

._container .content {
  width: calc(100% - 20px);
  height: calc(90% - 15px);
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
  overflow-y: auto;
}

._mdField {
  min-height: 32px !important;
}

.iconButton {
  display: flex;
  flex-direction: row;
  align-items: center;
}

._icon {
  margin-left: -15px;
}
</style>
