<template>
  <div class="card" @mouseover="isOver = true" @mouseleave="isOver = false">
    <div class="card-image">
      <div class="btn-edit">
        <button
          @click="showModalEdit = !showModalEdit"
          class="button is-small is-danger"
        >
          Editar
        </button>
      </div>
      <figure class="image is-4by3">
        <img
          :src="`${character.thumbnail.path}/landscape_incredible.${character.thumbnail.extension}`"
          :alt="character.name"
        />
      </figure>
    </div>
    <div
      class="card-content"
      :class="[
        !showDescription ? 'info' : '',
        !isOver ? 'info__over' : 'info_leave',
      ]"
    >
      <div class="content has-text-left">
        <p class="title is-4 has-text-white inf__title">
          {{ character.name }}
        </p>
        <time class="has-text-white info__date" datetime="{{ date }}">
          Fecha: {{ date }}
        </time>
        <p
          class="mt-2 has-text-white"
          :class="[
            !showDescription ? 'info__description' : 'info__description-full',
          ]"
        >
          {{ character.description }}
        </p>
        <a
          class="has-text-white info__read"
          href="#"
          v-if="character.description"
          @click.stop.prevent="showDescription = !showDescription"
        >
          <span v-if="!showDescription">Leer más</span>
          <span v-else>Leer menos</span>
        </a>
        <br />
      </div>
    </div>
    <edit-character
      :character="character"
      @update-character="$emit('updateCharacter', $event)"
      :show="showModalEdit"
      @hide-dialog="showModalEdit = $event"
    />
  </div>
</template>

<script>
import EditCharacter from './EditCharacter.vue';

export default {
  name: 'Character',

  props: {
    character: {
      type: Object,
      required: true,
    },
  },

  components: {
    EditCharacter,
  },

  data() {
    return {
      isOver: false,
      showDescription: false,
      showModalEdit: false,
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
  height: 220px
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
