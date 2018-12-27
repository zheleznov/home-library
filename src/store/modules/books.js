import firebase from '../../helpers/firebaseHelper';

const state = {
  books: [],
};

const getters = {
  allBooks(state) {
    return state.books;
  },

  getAllAuthors(state) {
    const authors = [];
    Object.keys(state.books).forEach((id) => {
      if (!authors.includes(state.books[id].author)) {
        authors.push(state.books[id].author);
      }
    });
    return authors;
  },
};

const mutations = {
  // add authots to state
  saveAuthors(state, payload) {
    state.authors = payload;
  },

  // add all books
  saveAllBooks(state, payload) {
    state.books = payload;
    Object.keys(state.books).forEach((bookId) => {
      state.books[bookId].id = bookId;
    });
  },

  // update book
  updateBook(state, bookInfo) {
    state.books[bookInfo.id] = bookInfo;
  },

  // add new book
  addNewBook(state, payload) {
    state.books[payload.id] = payload.bookInfo;
    state.books[payload.id].id = payload.id;
  },

  // delete book
  deleteBook(state, payload) {
    delete state.books[payload];
  },
};

const actions = {
  getAllBooks({ commit }) {
    const db = firebase.firestore();
    const booksCollection = {};

    db.collection('books').get().then((snapshot) => {
      snapshot.forEach((bookData) => {
        booksCollection[bookData.id] = bookData.data();
      });
      commit('saveAllBooks', booksCollection);
    });
  },

  saveBook({ commit }, bookInfo) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();

      if (bookInfo.id) { // update book. In this case we have id in bookInfo object
        db.collection('books')
          .doc(bookInfo.id)
          .update(bookInfo)
          .then(() => {
            commit('updateBook', bookInfo);
            resolve();
          })
          .catch(reject);
      } else { // create new book.
        db.collection('books').add(bookInfo).then((bookRef) => {
          commit('addNewBook', { id: bookRef.id, bookInfo });
          resolve();
        }).catch(reject);
      }
    });
  },

  deleteBook({ commit }, bookId) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection('books')
        .doc(bookId)
        .delete()
        .then(() => {
          commit('deleteBook', bookId);
          resolve();
        })
        .catch(reject);
    });
  },

  // upload book cover image to firebase store and call mutation to update user data for user (to write url for user avatar)
  saveBookCover({ dispatch, commit, state }, bookInfo) {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage()
        .ref();
      const imageRef = storageRef.child(`book-covers/${bookInfo.title}/${bookInfo.file.name}`);

      imageRef.put(bookInfo.file)
        .then(() => { // upload file
          imageRef.getDownloadURL()
            .then((url) => { // get file url
              resolve(url);
            });
        })
        .catch(reject);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
