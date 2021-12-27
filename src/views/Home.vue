<template>
  <div class="is-fullhd">
    <section class="hero is-medium">
      <div class="hero-body header">
        <div class="header__text">
          <h1
            class="title is-size-1 has-text-white is-size-4-mobile is-size-3-tablet is-size-1-desktop"
          >
            MARVEL CHARACTERS
          </h1>
          <div class="is-flex is-justify-content-center">
            <div class="field has-addons">
              <div class="control">
                <input
                  class="input is-danger"
                  type="text"
                  placeholder="Nombre del superhéroe"
                  v-model="query"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section pt-0">
      <div v-if="loading" class="loading">
        <div class="loading__text">Cargando...</div>
      </div>
      <div v-if="characters.length" class="columns is-multiline mt-5">
        <div
          v-for="character in characters"
          :key="character.id"
          class="column is-12-mobile is-6-tablet is-3-desktop"
        >
          <character
            :character="character"
            @update-character="updateCharacter($event)"
          />
        </div>
      </div>
      <p v-if="noResults" class="title is-size-5 mt-5">
        No hemos encontrado tu superhéroe...
      </p>
    </section>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import _ from 'lodash';

import marvelHash from '../utils/generate-hash';
import { getCharacters, getCharacterByName } from '../api/characters';
import Character from '@/components/Character.vue';

export default {
  name: 'Test3',
  components: {
    Character,
  },

  setup() {
    let characters = ref([]);
    let loading = ref(true);
    let query = ref('');
    let noResults = ref(false);

    const payload = {
      limit: 20,
      offset: 0,
      ts: process.env.VUE_APP_MARVEL_TS,
      apikey: process.env.VUE_APP_MARVEL_PUBLIC_KEY,
      hash: marvelHash(),
    };

    onMounted(async () => {
      // First load
      await fetchAllCharacter();

      // Scroll infinite
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow && !query.value) {
          // Update paginator result
          payload.offset += 20;
          fetchAllCharacter();
        }
      };
    });

    watch(
      () => query.value,
      _.debounce(async (val) => {
        if (val.length) {
          fetchCharacterByName(val);
        } else {
          characters.value = [];
          fetchAllCharacter();
        }
      }, 200)
    );

    /**
     * Fetch all Characters
     */
    async function fetchAllCharacter() {
      let response = [];

      noResults.value = false;
      loading.value = true;

      try {
        response = await getCharacters(payload);
      } catch (e) {
        console.log(e);
        return;
      } finally {
        loading.value = false;
      }

      characters.value.push(...response.data.data.results);
    }

    /**
     * Fetch Character by name
     */
    async function fetchCharacterByName(query) {
      let response = [];

      noResults.value = false;
      loading.value = true;

      try {
        response = await getCharacterByName(query, payload);
      } catch (e) {
        console.log(e);
        return;
      } finally {
        loading.value = false;
      }

      // Show no results
      if (response.data.data.results.length <= 0) {
        noResults.value = true;
      }
      characters.value = response.data.data.results;
    }

    /**
     * Update Character
     */
    function updateCharacter($event) {
      const index = characters.value.findIndex((item) => item.id === $event.id);
      if (index !== -1) {
        characters.value[index] = $event;
      }
    }

    return {
      query,
      characters,
      loading,
      noResults,
      updateCharacter,
      fetchAllCharacter,
      fetchCharacterByName,
    };
  },
};
</script>

<style lang="sass" scoped>
.header
  background: url("../assets/marvel-characters.jpg") no-repeat center
  background-size: cover
.header__text
  color: #fff
  padding: 15px
  background-color: rgba(0, 0, 0, 0.5)

.loading
  display: flex
  justify-content: center
  width: 100%
  position: fixed
  top: 0
  left: 0
  z-index: 10
.loading__text
  font-size: 0.9em
  background-color: #F4E185
  padding: 5px
  border-radius: 0px 0 3px 4px
</style>
