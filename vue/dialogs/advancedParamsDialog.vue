
<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)">
    <md-dialog-title class="title">

      <div>
        ADVANCED FILTER
      </div>

      <md-menu>

        <md-button class="md-icon-button"
                   md-menu-trigger>
          <md-icon>info</md-icon>
        </md-button>

        <info-component></info-component>
      </md-menu>

    </md-dialog-title>

    <md-dialog-content v-if="nameConfig && valueConfig"
                       class="_dialogContent md-layout">

      <!--
        ////////////////////////////////////////////////////////////////////////////
        //                              Name                                      //
        ////////////////////////////////////////////////////////////////////////////
       -->
      <md-list class="_leftSide md-layout-item md-size-50">
        <md-subheader style="justify-content : center">Name</md-subheader>

        <choose-option @change="changeName"
                       :choosed="nameConfig">
        </choose-option>

        <advanced-option v-if="nameConfig === '3'"
                         :regexValue="nameRegex"
                         :flagsValue="nameFlag"
                         :delimiterValue="nameDelimiter"
                         @regex="changeNameRegex"
                         @flags="changeNameFlag"
                         @delimiter="changeNameDelimiter"></advanced-option>

      </md-list>

      <!--
        ////////////////////////////////////////////////////////////////////////////
        //                              Value                                     //
        ////////////////////////////////////////////////////////////////////////////
       -->
      <md-list class="md-layout-item md-size-50">
        <md-subheader style="justify-content : center">Value</md-subheader>

        <choose-option @change="changeValue"
                       :choosed="valueConfig">
        </choose-option>

        <advanced-option v-if="valueConfig === '3'"
                         :regexValue="valueRegex"
                         :flagsValue="valueFlag"
                         :delimiterValue="valueDelimiter"
                         @regex="changeValueRegex"
                         @flags="changeValueFlag"
                         @delimiter="changeValueDelimiter"></advanced-option>

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
import AdvancedOption from "./components/filterAdvancedOption.vue";
import ChooseOption from "./components/chooseOption.vue";
import InfoComponent from "./components/infoComponent.vue";

export default {
  name: "AdvancedParamsDialog",
  props: ["onFinised"],
  components: {
    "advanced-option": AdvancedOption,
    "choose-option": ChooseOption,
    "info-component": InfoComponent
  },
  data() {
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
      }

      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised(closeResult);
      }
    },

    ////////////////////////////////////////////////////////////////////////////
    //                               Name                                     //
    ////////////////////////////////////////////////////////////////////////////
    changeName(value) {
      this.nameConfig = value;
      if (this.nameConfig === "1" || this.nameConfig === "2") {
        this.nameRegex = undefined;
        this.nameFlag = undefined;
      }
    },
    changeNameRegex(value) {
      this.nameRegex = value;
    },
    changeNameFlag(value) {
      this.nameFlag = value;
    },
    changeNameDelimiter(value) {
      this.nameDelimiter = value;
    },

    ////////////////////////////////////////////////////////////////////////////
    //                               Value                                    //
    ////////////////////////////////////////////////////////////////////////////

    changeValue(value) {
      this.valueConfig = value;
      if (this.valueConfig === "1" || this.valueConfig === "2") {
        this.valueRegex = undefined;
        this.valueFlag = undefined;
      }
    },
    changeValueRegex(value) {
      this.valueRegex = value;
    },
    changeValueFlag(value) {
      this.valueFlag = value;
    },
    changeValueDelimiter(value) {
      this.valueDelimiter = value;
    }
  }
};
</script>

<style scoped>
._dialogContent {
  width: 600px;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

._leftSide {
  border-right: 1px solid;
}

.subTitle {
  text-align: center;
}
</style>
