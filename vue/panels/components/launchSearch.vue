
<template>
  <div class="_container">
    <md-button class="_btn md-dense md-primary"
               @click="filter">
      <md-icon>check</md-icon>
      SEARCH
    </md-button>
  </div>
</template>

<script>
export default {
  name: "launchSearchComponent",
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  data() {
    return {};
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

      this.$emit("filter", regex);
    },
    getRegex(value, option, flag = undefined, argRegex = undefined) {
      let regex;

      if (option === "3" || (value && value.trim().length > 0)) {
        switch (option) {
          case "1":
            // regex = `/^${value.trim()}$/i`;
            regex = new RegExp(`^${value.trim()}$`, "i");
            break;
          case "2":
            // regex = `/${value.trim()}/i`;
            regex = new RegExp(`${value.trim()}`, "i");

            break;
          case "3":
            if (argRegex && flag) {
              regex = new RegExp(argRegex, flag.replace(",", ""));
            } else if (argRegex && typeof flag === "undefined") {
              regex = new RegExp(argRegex);
            }
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
</style>
