const md5 = require('md5');

export default function marvelHash() {
  return md5(
    process.env.VUE_APP_MARVEL_TS +
      process.env.VUE_APP_MARVEL_PRIVATE_KEY +
      process.env.VUE_APP_MARVEL_PUBLIC_KEY
  );
}
