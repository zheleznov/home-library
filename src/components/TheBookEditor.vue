<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card" v-if="bookInfo">
          <div class="card-header">
            <strong>Book Editor</strong>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <ul class="nav nav-tabs book-form-tabs" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#main-info" role="tab" aria-controls="main" @click.prevent="tabSwitch">Main Info</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#publisher-info" role="tab" aria-controls="publisher" @click.prevent="tabSwitch">Publish Info</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#placement" role="tab" aria-controls="placement" @click.prevent="tabSwitch">Placement</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#review" role="tab" aria-controls="comments" @click.prevent="tabSwitch">Comments</a>
                  </li>
                </ul>
                <div class="tab-content book-form-tabs-content">
                  <!-- MAIN TAB -->
                  <div class="tab-pane active" id="main-info" role="tabpanel">
                    <div class="row">
                      <div class="col-sm-8">
                        <div class="form-group">
                          <label for="book-name">Book Name</label>
                          <input class="form-control" :class="{'is-invalid': $v.bookInfo.title.$error}"
                                 id="book-name" type="text" placeholder="Enter book name" v-model="bookInfo.title" @blur="$v.bookInfo.title.$touch()">
                          <TheInputError v-if="$v.bookInfo.title.$error">
                            <p v-show="!$v.bookInfo.title.required">This field is required</p>
                          </TheInputError>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-8">
                        <div class="form-group author-group">
                          <label for="author">Author</label>
                          <input class="form-control" :class="{'is-invalid': $v.bookInfo.author.$error}"
                                 id="author" type="text" placeholder="Author" v-model="bookInfo.author" @blur="$v.bookInfo.author.$touch()">
                          <TheInputError v-if="$v.bookInfo.author.$error">
                            <p v-show="!$v.bookInfo.author.required">This field is required</p>
                          </TheInputError>
                          <ul class="suggested-authors" v-if="bookInfo.author && suggestedAuthors.length">
                            <li v-for="author in suggestedAuthors" :key="author.id" @click="selectAuthor">{{ author }}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-2">
                        <div class="form-group">
                          <label for="genre">Genre</label>
                          <select class="custom-select" id="genre" v-model="bookInfo.genre" @blur="$v.bookInfo.genre.$touch()">
                            <option selected="selected" value="Drama">Drama</option>
                            <option value="Hisctoric">Historic</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Adventures">Adventures</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Detective">Detective</option>
                          </select>
                          <TheInputError v-if="$v.bookInfo.genre.$error">
                            <p v-show="!$v.bookInfo.genre.required">This field is required</p>
                          </TheInputError>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <label>Was read</label>
                        <div class="form-group">
                          <label class="switch switch-pill switch-success">
                            <input type="checkbox" class="switch-input" v-model="bookInfo.wasRead">
                            <span class="switch-slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- PUBLISHER TAB -->
                  <div class="tab-pane" id="publisher-info" role="tabpanel">
                    <div class="row">
                      <div class="col-sm-2">
                        <div class="form-group">
                          <label for="publish-year">Publish Year</label>
                          <input class="form-control" id="publish-year" type="text" placeholder="Publish year" v-model="bookInfo.publishYear">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-8">
                        <div class="form-group">
                          <label for="publisher">Publisher</label>
                          <input class="form-control" id="publisher" type="text" placeholder="publisher" v-model="bookInfo.publisher">
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- PLACE TAB -->
                  <div class="tab-pane" id="placement" role="tabpanel">
                    <div class="row">
                      <div class="col-sm-2">
                        <div class="form-group">
                          <label for="shelf">Shelf</label>
                          <input class="form-control" id="shelf" type="number" placeholder="Book Shelf" v-model="bookInfo.shelf">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-2">
                        <div class="form-group">
                          <label for="shelf-row">Shelf Row</label>
                          <input class="form-control" id="shelf-row" type="number" placeholder="Shelf row" v-model="bookInfo.row">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-2">
                        <div class="form-group">
                          <label for="position">Position</label>
                          <input class="form-control" id="position" type="number" placeholder="Book position" v-model="bookInfo.position">
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- COMMENTS TAB -->
                  <div class="tab-pane" id="review" role="tabpanel">
                    <div class="row">
                      <div class="col-sm-8">
                        <div class="form-group">
                          <label for="comments">Comments</label>
                          <textarea class="form-control" id="comments" rows="5" v-model="bookInfo.comments"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-buttons">
                  <div class="col-sm-12">
                    <button class="btn btn-primary" type="submit" :class="{'is-invalid': $v.bookInfo.$invalid}" :disabled="$v.bookInfo.$invalid" @click="saveBook">
                      <i class="fa fa-dot-circle-o"></i> Save</button>
                    <button class="btn btn-warning" type="reset" @click="deleteBook" v-if="this.$route.params.id">
                      <i class="fa fa-trash-o"></i> Delete Book</button>
                    <button class="btn btn-danger" type="reset" @click="cancelEditing">
                      <i class="fa fa-ban"></i> Cancel</button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <p class="book-cover-image">
                    <img class="card-img-top" src="../assets/images/book-cover.jpg" alt="Book Cover" v-if="!bookInfo.coverURL">
                    <img class="card-img-top" :src="bookInfo.coverURL" alt="Book Cover" v-if="bookInfo.coverURL">
                  </p>
                  <div class="card-body">
                    <h5 class="card-title">Book Cover</h5>
                    <p class="card-text">Please add book cover from the file or search it from the google search.</p>
                    <section>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="book-cover" :disabled="$v.bookInfo.title.$invalid" @change="uploadBookCover">
                        <label class="custom-file-label" for="book-cover">Choose file</label>
                      </div>
                      <!-- <button type="button" class="btn btn-brand btn-google btn-primary" :disabled="$v.bookInfo.title.$invalid">
                        <i class="fa fa-google"></i><span>Google search</span>
                      </button> -->
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheModal v-if="modalData" :modalData="modalData" @modalClose="modalClose"/>
    <TheSpinner v-if="isLoading"/>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapActions, mapState } from 'vuex';
import modalMessages from '../helpers/modalMessages';
import TheInputError from '../components/TheInputError.vue';
import TheModal from '../components/TheModal.vue';
import TheSpinner from '../components/TheSpinner.vue';

// TODO:: Case with Cover images. Create a lot of folder in firebase storage. To think
// TODO:: Google search

export default {
  name: 'TheBookEditor',

  components: {
    TheInputError,
    TheModal,
    TheSpinner,
  },

  data() {
    return {
      defaultData: {
        title: '',
        author: '',
        genre: 'Drama',
        wasRead: false,
        publisher: '',
        publishYear: '',
        shelf: 0,
        row: 0,
        position: 0,
        comments: '',
        coverURL: '',
      },
      isLoading: false,
      modalData: null,
      isDeleted: false,
    };
  },

  validations: {
    bookInfo: {
      title: {
        required,
      },
      author: {
        required,
      },
      genre: {
        required,
      },
    },
  },

  computed: {
    ...mapGetters('books', [
      'getAllAuthors',
    ]),

    ...mapState('books', [
      'books',
    ]),

    bookInfo() {
      return (this.$route.params.id) ? this.books[this.$route.params.id] : this.defaultData;
    },

    // list of suggested authors, if them already exist
    suggestedAuthors() {
      const suggestedAuthors = [];

      this.getAllAuthors.forEach((author) => {
        if (author.toLowerCase().search(this.bookInfo.author.toLowerCase()) >= 0) {
          suggestedAuthors.push(author);
        }
      });

      return suggestedAuthors;
    },
  },

  methods: {
    ...mapActions({
      saveBookData: 'books/saveBook',
      saveBookCover: 'saveBookCover',
      deleteBook: 'deleteBook',
    }),

    // switch tabs in book form
    tabSwitch(e) {
      const { target } = e;
      const selectedId = target.getAttribute('href');

      Array.from(this.$el.querySelectorAll('.book-form-tabs li')).forEach((elem) => {
        elem.querySelector('a').classList.remove('active');
      });

      target.classList.add('active');

      Array.from(this.$el.querySelectorAll('.book-form-tabs-content > div')).forEach((elem) => {
        elem.classList.remove('active');
      });

      this.$el.querySelector(selectedId).classList.add('active');
    },

    // select authors in suggested area
    selectAuthor(e) {
      this.bookInfo.author = e.target.textContent;
      this.$el.querySelector('.suggested-authors').style.display = 'none';
    },

    // save book data
    async saveBook() {
      this.isLoading = true;

      try {
        await this.saveBookData(this.bookInfo);

        this.isLoading = false;
        this.modalData = modalMessages.bookSaved;
      } catch (error) {
        this.modalData = modalMessages.getErrorMessage(error);
      }
    },

    // upload book cover
    async uploadBookCover(e) {
      const { target } = e;
      const { files } = target;
      this.isLoading = true;

      try {
        this.bookInfo.coverURL = await this.saveBookCover({ title: this.bookInfo.title, file: files[0] });
        this.isLoading = false;
      } catch (error) {
        throw new Error(error);
      }
    },

    // close modal window
    modalClose() {
      this.modalData = null;
      this.$router.push({ name: 'all-books' });
    },

    // cancel editing
    cancelEditing() {
      const routeName = this.$route.params.id ? 'all-books' : 'home';
      this.$router.push({ name: routeName });
    },

    // delete book
    async deleteBook() {
      this.isLoading = true;
      try {
        await this.deleteBook(this.bookInfo.id);

        this.isLoading = false;
        this.isDeleted = true;
        this.modalData = modalMessages.bookDeleted;
      } catch (error) {
        this.modalData = modalMessages.getErrorMessage(error);
      }
    },
  },
};
</script>

<style scoped>
  .custom-file {
    width: 50%;
  }

  .btn-google {
    margin-left: 20px;
  }

  .book-cover-image {
    text-align: center;
    padding-top: 20px;
  }

  .book-cover-image img {
    width: 50%;
    min-height: 192px;
  }

  .btn-danger,
  .btn-warning {
    margin-left: 20px;
  }

  .form-buttons {
    padding-top: 20px;
  }

  .form-buttons > div {
    padding: 0;
  }

  .book-form-tabs-content {
    min-height: 360px;
  }

  .author-group {
    position: relative;
  }

  .suggested-authors {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding-left: 0;
    position: absolute;
    width: 100%;
    z-index: 100;
    background: #fff;
  }

  .suggested-authors li {
    list-style-type: none;
    cursor: pointer;
    line-height: 30px;
    border-bottom: 1px solid lightgray;
    padding-left: 10px;
  }

  .suggested-authors li:hover {
    background-color: lightcyan;
  }

  .suggested-authors li:last-child {
    border-bottom: none;
  }
</style>
