import httpClient from './httpClient';

const END_POINT = '/characters';

const getCharacters = (payload) =>
  httpClient.get(
    `${END_POINT}?limit=${payload.limit}&offset=${payload.offset}&ts=${payload.ts}&apikey=${payload.apikey}&hash=${payload.hash}`
  );

const getCharacterByName = (name, payload) =>
  httpClient.get(
    `${END_POINT}?name=${name}&ts=${payload.ts}&apikey=${payload.apikey}&hash=${payload.hash}`
  );

export { getCharacters, getCharacterByName };
