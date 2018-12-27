import firebase from '../../helpers/firebaseHelper';

const state = {
  authUser: null,
  pathInfo: {
    section: null,
    name: null,
  },
};

const mutations = {
  saveUser(state, {
    displayName, email, uid, photoURL,
  }) {
    state.authUser = {
      displayName,
      email,
      uid,
      photoURL,
    };
  },

  // remove user data from state
  removeUser(state) {
    state.authUser = null;
  },

  // update user data
  updateUser(state, payload) {
    const key = Object.keys(payload)[0];
    state.authUser[key] = payload[key];
  },

  savePathInfo(state, payload) {
    const pathArray = payload.split('/');
    state.pathInfo.section = pathArray.length && pathArray[1];
    state.pathInfo.name = pathArray.length && pathArray[2];
  },
};

const actions = {
  // login user
  login({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      firebase.auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((response) => {
          commit('saveUser', response.user);
          resolve(state.authUser.uid);
        })
        .catch(reject);
    });
  },

  // logout user
  logout() {
    return firebase.auth().signOut();
  },

  // subscribe for any auth changed (login, logout, update email password in firebase)
  onAuthStateChanged({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth()
        .onAuthStateChanged((user) => {
          if (user) {
            commit('saveUser', user);
            resolve(user.uid);
          } else {
            commit('removeUser');
            reject();
          }
        });
    });
  },

  // create user account
  createAccount({ commit }, userInfo) {
    return firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password);
  },

  // update user name in firebase
  updateUserName({ commit }, name) {
    return new Promise((resolve, reject) => {
      const currentUserRef = firebase.auth().currentUser;

      currentUserRef.updateProfile({
        displayName: name,
      })
        .then(() => {
          commit('updateUser', { displayName: name });
          resolve('User name updated');
        })
        .catch(reject);
    });
  },

  // update user image in firebase with commit to state
  updateUserAvatar({ commit }, url) {
    return new Promise((resolve, reject) => {
      const currentUserRef = firebase.auth().currentUser;

      currentUserRef.updateProfile({
        photoURL: url,
      })
        .then(() => {
          commit('updateUser', { photoURL: url });
          resolve('User image updated');
        })
        .catch(reject);
    });
  },

  updateUserEmail({ commit }, email) {
    return new Promise((resolve, reject) => {
      const currentUserRef = firebase.auth().currentUser;

      currentUserRef.updateEmail(email)
        .then(() => {
          commit('updateUser', { email });
          resolve('User email updated');
        })
        .catch(reject);
    });
  },

  updateUserPassword(context, password) {
    const currentUserRef = firebase.auth().currentUser;
    return currentUserRef.updatePassword(password);
  },

  // upload user image to firebase store and call mutation to update user data for user (to write url for user avatar)
  saveUserAvatar({ dispatch, commit, state }, file) {
    return new Promise((resolve, reject) => {
      const userId = state.authUser.uid;
      const storageRef = firebase.storage()
        .ref();
      const imageRef = storageRef.child(`avatars/${userId}/${file.name}`);

      imageRef.put(file)
        .then(() => { // upload file
          imageRef.getDownloadURL()
            .then((url) => { // get file url
              dispatch('updateUserAvatar', url) // call to update user data in firebase auth
                .then(() => {
                  commit('updateUser', { photoURL: url });
                  resolve();
                });
            });
        })
        .catch(reject);
    });
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
