<template>
  <div class="_container">
    <div class="header">
      <md-button class="_btn md-dense md-primary"
                 @click="reset">
        <md-icon>restore</md-icon>
        RESET
      </md-button>

      <md-button class="_btn md-dense md-primary"
                 @click="addProperty">
        <md-icon>add</md-icon>
        ADD PROPERTY
      </md-button>
    </div>

    <md-content class="content md-scrollbar">

      <div class="md-layout md-gutter"
           v-for="item in data"
           :key="item.id">
        <div class="md-layout-item md-small-size-100">
          <md-field class="_mdField">
            <label>Name</label>
            <md-input palceholder="Name"></md-input>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field class="_mdField">
            <label>Value</label>
            <md-input palceholder="Value"></md-input>
          </md-field>
        </div>
        <!-- <div class="md-layout-item md-size-10"></div> -->

        <div class="md-layout-item md-small-size-100 iconButton">
          <md-button class="md-icon-button"
                     v-if="item.id !== 1"
                     @click="deleteItem(item)">
            <md-icon class="_icon">clear</md-icon>
          </md-button>
        </div>

      </div>
    </md-content>
  </div>
</template>



<script>
const PROPERTY_MODEL = {
  id: 1,
  property: "",
  value: "",
  required: false
};

export default {
  name: "filterPanel",
  data() {
    return {
      data: [PROPERTY_MODEL]
    };
  },
  methods: {
    opened() {},
    addProperty() {
      let obj = Object.assign({}, PROPERTY_MODEL);
      obj.id = this.data.length + 1;

      this.data.push(obj);
    },
    reset() {
      this.data = [PROPERTY_MODEL];
    },
    deleteItem(item) {
      this.data = this.data.filter(el => el.id !== item.id);
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
  justify-content: center;
  display: flex;
  flex-direction: column;
}

._icon {
  margin-left: -15px;
}
</style>
