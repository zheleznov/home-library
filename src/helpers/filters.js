export default {
  firstLetterCapitalize(string) {
    let pieces = string.split(' ');
    for (let i = 0; i < pieces.length; i += 1) {
      let j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1)
        .toLowerCase();
    }
    return pieces.join(' ');
  },

  replaceLineToSpace(value) {
    return value.replace(/-/g, ' ');
  },
};
