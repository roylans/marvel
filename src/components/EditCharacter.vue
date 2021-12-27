<template>
  <div class="modal" :class="[show ? 'is-active is-clipped' : '']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar superhéroe</p>
        <button
          @click="$emit('hideDialog', false)"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <div class="card-image">
              <figure class="image">
                <img
                  :src="`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`"
                  :alt="character.name"
                />
              </figure>
            </div>
          </div>
          <div class="column is-8 has-text-left">
            <label class="has-text-weight-bold">Nombre:</label>
            <input
              class="input is-danger"
              v-model="infoCharacter.name"
              type="text"
              placeholder="Número 1"
            />
            <br /><br />
            <label class="has-text-weight-bold">Descripción:</label>
            <textarea
              class="textarea is-danger"
              placeholder="Descripción"
              v-model="infoCharacter.description"
            ></textarea>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-end">
        <button @click="$emit('hideDialog', false)" class="button">
          Cancelar
        </button>
        <button @click="update()" class="button is-black">Guardar</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Character',
  props: {
    show: {
      type: Boolean,
      require: true,
    },
    character: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      infoCharacter: { ...this.character },
    };
  },

  methods: {
    update() {
      this.$emit('updateCharacter', { ...this.infoCharacter });
      this.$emit('hideDialog', false);
    },
  },
};
</script>

<style scoped lang="sass"></style>
