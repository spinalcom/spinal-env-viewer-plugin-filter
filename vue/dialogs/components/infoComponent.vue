<template>
  <md-menu-content style="z-index: 9999 !important">

    <md-menu-item class="information"
                  v-for="(info,index) in infos"
                  :key="index">
      <!-- <md-avatar class="md-avatar-icon">{{info.id}}</md-avatar> -->

      <div class="md-list-item-text">
        <span class="title">{{info.title}}</span>
        <span class="description">{{info.description}}</span>
      </div>
    </md-menu-item>

  </md-menu-content>
</template>

<script>
import Infos from "../info";

export default {
  name: "infoComponent",
  data() {
    this.infos = Infos;
    return {};
  }
};
</script>

<style scoped>
/* ._info {
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
} */

.information .title {
  font-style: oblique !important;
  font-weight: bold !important;
}

.information .description {
  color: gray !important;
}
</style>
