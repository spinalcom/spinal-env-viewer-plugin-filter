
<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)">
    <md-dialog-title class="title">ADVANCED FILTER</md-dialog-title>

    <md-dialog-content v-if="nameConfig && valueConfig"
                       class="_dialogContent md-layout">

      <md-list class="_leftSide md-layout-item md-size-50">
        <md-subheader style="justify-content : center">Name</md-subheader>

        <md-list-item>
          <md-radio v-model="nameConfig"
                    value="1"
                    @change="changeName" />
          <span class="md-list-item-text">Equals</span>
        </md-list-item>

        <md-list-item>
          <md-radio v-model="nameConfig"
                    value="2"
                    @change="changeName" />
          <span class="md-list-item-text">Contains</span>
        </md-list-item>

        <md-list-item>
          <md-radio v-model="nameConfig"
                    value="3"
                    @change="changeName" />
          <span class="md-list-item-text">Others</span>
        </md-list-item>

        <!-- Name Regex Form -->
        <md-list v-if="nameConfig === '3'">
          <md-list-item>
            <md-field class="_mdField">

              <md-menu>
                <!-- md-menu-trigger -->
                <md-button class="md-icon md-prefix">{{nameDelimiter}}
                </md-button>

                <!-- <md-menu-content>
                  <md-menu-item v-for="(delimiter,index) in delimiters"
                                :key="index"
                                @click="changeNameDelimiter(delimiter)">{{delimiter}}</md-menu-item>
                </md-menu-content> -->

              </md-menu>

              <!-- <label>Regex</label> -->

              <md-input v-model="nameRegex"
                        palceholder="Regex"></md-input>

              <span class="md-icon md-suffix">{{nameDelimiter}}</span>
            </md-field>
          </md-list-item>

          <md-list-item>
            <md-field class="_mdField">
              <label>Flag</label>
              <!-- <md-input v-model="nameFlag"
                        palceholder="flag"></md-input> -->

              <md-select v-model="nameFlag"
                         name="flags"
                         id="flags"
                         md-dense
                         multiple>

                <md-option v-for="(flag,index) in flagsList"
                           :key="index"
                           :value="flag.value">{{flag.name}}</md-option>

              </md-select>

            </md-field>
          </md-list-item>
        </md-list>
        <!-- End Name Regex Form -->

      </md-list>

      <md-list class="md-layout-item md-size-50">
        <md-subheader style="justify-content : center">Value</md-subheader>

        <md-list-item>
          <md-radio v-model="valueConfig"
                    value="1"
                    @change="changeValue" />
          <span class="md-list-item-text">Equals</span>
        </md-list-item>

        <md-list-item>
          <md-radio v-model="valueConfig"
                    value="2"
                    @change="changeValue" />
          <span class="md-list-item-text">Contains</span>
        </md-list-item>

        <md-list-item>
          <md-radio v-model="valueConfig"
                    value="3"
                    @change="changeValue" />
          <span class="md-list-item-text">Others</span>
        </md-list-item>

        <!-- Value Regex Form -->
        <md-list v-if="valueConfig === '3'">
          <md-list-item>
            <md-field class="_mdField">

              <md-menu>
                <!-- md-menu-trigger -->
                <md-button class="md-icon md-prefix">{{valueDelimiter}}
                </md-button>

                <!-- <md-menu-content>
                  <md-menu-item v-for="(delimiter,index) in delimiters"
                                :key="index"
                                @click="changeValueDelimiter(delimiter)">{{delimiter}}</md-menu-item>
                </md-menu-content> -->

              </md-menu>
              <!-- <label>Regex</label> -->
              <md-input v-model="valueRegex"
                        palceholder="Regex"></md-input>

              <span class="md-icon md-suffix">{{valueDelimiter}}</span>

            </md-field>
          </md-list-item>

          <md-list-item>
            <md-field class="_mdField">
              <label>Flags</label>
              <!-- <md-input v-model="valueFlag"
                        palceholder="flag"></md-input> -->

              <md-select v-model="valueFlag"
                         name="flags"
                         id="flags"
                         md-dense
                         multiple>

                <md-option v-for="(flag,index) in flagsList"
                           :key="index"
                           :value="flag.value">{{flag.name}}</md-option>

              </md-select>

            </md-field>

          </md-list-item>
        </md-list>
        <!-- End Value Regex Form -->

      </md-list>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog(false)">Close</md-button>
      <md-button class="md-primary"
                 @click="closeDialog(true)">Save</md-button>
    </md-dialog-actions>
  </md-dialog>

</template>


<script>
import flagsList from "./flags.js";
import delimiter from "./delimiter.js";

export default {
  name: "AdvancedParamsDialog",
  props: ["onFinised"],
  data() {
    this.flagsList = flagsList;
    this.delimiters = delimiter;

    this.callback;
    this.item;
    return {
      showDialog: true,

      //Name
      nameConfig: null,
      nameDelimiter: "/",
      nameRegex: null,
      nameFlag: [],

      //Value
      valueConfig: null,
      valueDelimiter: "/",
      valueFlag: [],
      valueRegex: null
    };
  },
  methods: {
    opened(option) {
      // this.resetAllValue(() => {
      // this.callback = option.callback;
      this.item = option.params;

      //Name
      this.nameConfig = option.params.config.name.option;
      this.nameRegex = option.params.config.name.regex;
      this.nameFlag = option.params.config.name.flag;

      //Value
      this.valueConfig = option.params.config.value.option;
      this.valueRegex = option.params.config.value.regex;
      this.valueFlag = option.params.config.value.flag;
      // });
    },
    removed(closed) {
      if (closed) {
        //Name
        this.item.config.name.option = this.nameConfig;

        this.item.config.name.regex = this.nameRegex;

        // if (typeof this.nameRegex !== "undefined") {
        //   this.item.config.name.regex =
        //     this.nameDelimiter + this.nameRegex + this.nameDelimiter;
        //   this.item.config.name.flag = this.nameFlag;
        // }

        this.item.config.name.flag = this.nameFlag
          ? this.nameFlag.join("")
          : undefined;

        //Value
        this.item.config.value.option = this.valueConfig;

        this.item.config.value.regex = this.valueRegex;

        // if (this.valueRegex !== "undefined") {
        //   this.item.config.value.regex =
        //     this.valueDelimiter + this.valueRegex + this.valueDelimiter;
        // }

        this.item.config.value.flag = this.valueFlag
          ? this.valueFlag.join("")
          : undefined;
        // this.resetAllValue(() => {
        //   this.callback(this.item);
        // });
      }

      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised(closeResult);
      }
    },
    changeName() {
      if (this.nameConfig === "1" || this.nameConfig === "2") {
        this.nameRegex = undefined;
        this.nameFlag = undefined;
      }
    },
    changeValue() {
      if (this.valueConfig === "1" || this.valueConfig === "2") {
        this.valueRegex = undefined;
        this.valueFlag = undefined;
      }
    },
    resetAllValue(callback) {
      //Name
      this.nameConfig = null;
      this.nameRegex = null;
      this.nameFlag = null;

      //Value
      this.valueConfig = null;
      this.valueRegex = null;
      this.valueFlag = null;

      callback();
    },

    changeNameDelimiter(delimiter) {
      this.nameDelimiter = delimiter;
    },

    changeValueDelimiter(delimiter) {
      this.valueDelimiter = delimiter;
    }
  }
};
</script>

<style scoped>
._dialogContent {
  width: 600px;
}

._leftSide {
  border-right: 1px solid;
}

.title,
.subTitle {
  text-align: center;
}
</style>
