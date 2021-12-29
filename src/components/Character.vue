<template>
  <div class="card" @mouseover="isOver = true" @mouseleave="isOver = false">
    <div class="card-imag info_leave">
      <figure class="image is-4by3">
        <img
          :src="`${character.thumbnail.path}/landscape_incredible.${character.thumbnail.extension}`"
          :alt="character.name"
        />
      </figure>
    </div>
    <div class="info__separator"></div>
    <div
      class="card-content info"
      :class="[
        !isOver ? 'info__over' : 'info_leave',
      ]"
    >
      <div class="content has-text-left">
        <p class="title is-size-5-mobile is-size-5-tablet is-size-7-desktop has-text-white inf__title">
          {{ character.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Character',

  props: {
    character: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isOver: false,
    };
  },

  computed: {
    date() {
      let dateModified = new Date(this.character.modified);

      return new Intl.DateTimeFormat('en-GB')
        .format(dateModified)
        .split('/')
        .join('-');
    },
  },
};
</script>

<style scoped lang="sass">
.btn-edit
  position: relative
  float: right
  top: 0
  color: red
  z-index: 10
.info
  height: 100px
.info__separator
  height: 5px
  background-color: #F90716
.info__over
  background-color: black
.info_leave
  background-color: #F90716
.info__date
  font-size: 0.7rem
.info__description
  font-size: 0.9rem
  text-overflow: ellipsis
  overflow: hidden
  display: -webkit-box !important
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  white-space: normal
.info__description-full
  font-size: 0.9rem
.info__read
  font-size: 0.7rem
</style>
