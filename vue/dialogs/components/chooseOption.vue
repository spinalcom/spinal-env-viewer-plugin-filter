
<template>
  <div>
    <md-list-item>
      <md-radio v-model="option"
                value="1" />
      <span class="md-list-item-text">Equals</span>
    </md-list-item>

    <md-list-item>
      <md-radio v-model="option"
                value="2" />
      <span class="md-list-item-text">Contains</span>
    </md-list-item>

    <md-list-item>
      <md-radio v-model="option"
                value="3" />
      <span class="md-list-item-text">Advanced</span>

    </md-list-item>
  </div>
</template>


<script>
export default {
  name: "chooseOption",
  props: {
    choosed: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      option: "1"
    };
  },
  mounted() {
    this.option = this.choosed;
  },
  watch: {
    option: function(newValue) {
      this.$emit("change", newValue);
    }
  }
};
</script>