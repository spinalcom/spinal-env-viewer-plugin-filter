
<template>
  <!-- <div style="width : 100%; height : 100%; overflow : hidden"> -->
  <div class="_container">
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

      <!-- <md-button class="_btn md-dense md-primary"
                 @click="filter">
        <md-icon>check</md-icon>
        SEARCH
      </md-button> -->

    </div>

    <md-content class="_content md-scrollbar">

      <div class="_items"
           v-for="item in data"
           :key="item.id">

        <md-field class="_mdField">
          <label>Name</label>

          <md-input v-model="item.name"
                    palceholder="Name"
                    :disabled="isDisabled(item,'name')"></md-input>

          <span class="md-helper-text"
                v-if="isDisabled(item,'name')">Personalized</span>
        </md-field>

        <md-field class="_mdField">
          <label>Value</label>

          <md-input v-model="item.value"
                    palceholder="Value"
                    :disabled="isDisabled(item,'value')"></md-input>

          <span class="md-helper-text"
                v-if="isDisabled(item,'value')">Personalized</span>
        </md-field>

        <!-- <div class="md-layout-item md-size-10"></div> -->

        <div class="_mdField iconButton">

          <md-button class="md-icon-button"
                     title="config"
                     @click="advanced(item)">
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

  <!-- <div class="_container"
         v-if="loaded">
      <md-content class="content2"
                  v-if="loaded">
        loading...
      </md-content>
    </div> -->
  <!-- </div> -->
</template>


<script>
export default {
  name: "filterFormComponent",
  props: {
    data: {
      type: Array,
      required: true
    },
    loaded: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    addProperty() {
      this.$emit("add");
    },
    reset() {
      this.$emit("reset");
    },
    deleteItem(item) {
      this.$emit("delete", item);
    },
    filter() {
      this.$emit("validate");
    },

    advanced(item) {
      this.$emit("config", item);
    },
    isDisabled(item, name) {
      let disabled = item.config[name].option == 3;

      item[name] = disabled ? "" : item[name];

      return disabled;
    }
  }
};
</script>

<style scoped>
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

._container ._content {
  width: calc(100%);
  height: 150px; /* calc(90% - 15px); */
  overflow: auto;
  padding-left: 10px;
  padding-right: 10px;
  background-color: transparent;
  /* overflow-y: auto; */
}

._container ._content ._items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

._mdField {
  margin-right: 15px;
}

.iconButton {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
}

._icon {
  margin-left: -15px;
}
</style>
