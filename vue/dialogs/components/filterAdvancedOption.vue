
<template>
  <!-- Value Regex Form -->
  <md-list>
    <md-list-item>
      <md-field class="_mdField">

        <md-menu>
          <!-- md-menu-trigger -->
          <md-button class="md-icon md-prefix">{{delimiterV}}
          </md-button>

          <!-- <md-menu-content>
            <md-menu-item v-for="(delimiter,index) in delimiters"
                          :key="index"
                          @click="changeDelimiter(delimiter)">{{delimiter}}
            </md-menu-item>
          </md-menu-content> -->

        </md-menu>

        <md-input v-model="regex"
                  palceholder="Regex"></md-input>

        <span class="md-icon md-suffix">{{delimiterV}}</span>

      </md-field>
    </md-list-item>

    <md-list-item>
      <md-field class="_mdField">
        <label>Flags</label>

        <md-select v-model="flags"
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
</template>

<script>
import flagsList from "../flags.js";
import delimiter from "../delimiter.js";

export default {
  name: "advancedOption",
  props: {
    regexValue: {
      required: true
    },
    flagsValue: {
      required: true
    },
    delimiterValue: {
      required: true
    }
  },
  data() {
    this.flagsList = flagsList;
    this.delimiters = delimiter;

    return {
      regex: "",
      delimiterV: "/",
      flags: []
    };
  },
  mounted() {
    this.regex = this.regexValue;
    this.flags = [];

    if (typeof this.flagsValue !== "undefined") {
      this.flags = Array.isArray(this.flagsValue)
        ? this.flagsValue
        : this.flagsValue.split("");
    }

    this.delimiterV = this.delimiterValue;
  },
  methods: {
    changeDelimiter(delimiter) {
      this.delimiterV = delimiter;
    }
  },
  watch: {
    regex: function(newValue) {
      this.$emit("regex", newValue);
    },
    delimiterV: function(newValue) {
      this.$emit("delimiter", newValue);
    },
    flags: function(newValue) {
      this.$emit("flags", newValue);
    }
  }
};
</script>