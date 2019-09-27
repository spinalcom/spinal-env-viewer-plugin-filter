
<template>
  <div class="_container">

    <div class="md-layout">
      <div class="md-layout-item md-size-50">
        <md-checkbox v-model="searchOnBim"
                     class="md-primary">Search on Forge Attributes</md-checkbox>
      </div>
      <div class="md-layout-item md-size-50">
        <md-checkbox v-model="searchOnSpinalAttributes"
                     class="md-primary">Search on spinal Attributes
        </md-checkbox>
      </div>

    </div>

    <div class="launchBtn md-layout">
      <md-button class="_btn md-layout-item md-size-100 md-dense md-primary"
                 @click="filter">
        <md-icon>check</md-icon>
        SEARCH
      </md-button>
    </div>

  </div>
</template>

<script>
// import flags from "../../dialogs/flags";
export default {
  name: "launchSearchComponent",
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      searchOnBim: true,
      searchOnSpinalAttributes: true
    };
  },
  methods: {
    filter() {
      let regex = this.data.map(item => {
        return {
          nameRegex: this.getRegex(
            item.name,
            item.config.name.option,
            item.config.name.flag,
            item.config.name.regex
          ),
          valueRegex: this.getRegex(
            item.value,
            item.config.value.option,
            item.config.value.flag,
            item.config.value.regex
          )
        };
      });

      if (this.searchOnBim || this.searchOnSpinalAttributes) {
        this.$emit("filter", {
          regex: regex,
          bimAttributes: this.searchOnBim,
          spinalAttributes: this.searchOnSpinalAttributes
        });
      } else {
        alert("Sorry, you must select at least one element !!");
      }
    },
    getRegex(value, option, flag = undefined, argRegex = undefined) {
      let regex;

      if (option === "3" || (value && value.trim().length > 0)) {
        switch (option) {
          case "1":
            // regex = `/^${value.trim()}$/i`;
            regex = RegExp.escape(`^${value.trim()}$`, "i");
            break;
          case "2":
            // regex = `/${value.trim()}/i`;
            regex = RegExp.escape(`${value.trim()}`, "i");

            break;
          case "3":
            // if (argRegex && flag) {
            //   regex = new RegExp(argRegex, flag);
            // } else if (argRegex && typeof flag === "undefined") {
            //   regex = new RegExp(argRegex);
            // }
            regex = new RegExp(argRegex, flag);
            break;
        }
      }

      return regex;
    }
  }
};
</script>

<style scoped>
._container ._btn {
  padding-right: 10px;
  border: 1px solid #448aff;
}

._container .launchBtn {
  margin-top: 30px;
}
</style>
