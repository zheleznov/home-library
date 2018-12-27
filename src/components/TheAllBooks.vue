<template>
  <div class="container-fluid">
    <div class="row justify-content-left">
      <div class="col-sm-4 col-md-2" v-for="book in booksArrayToShow" :key="book.id">
        <div class="card" @click="showBookDetails" :data-book-id="book.id">
          <div class="card-header">{{ book.title }}
            <span class="badge badge-success float-right" v-if="book.wasRead">R</span>
          </div>
          <div class="card-body">
            <img :src="book.coverURL" :alt="book.title"/>
          </div>
        </div>
      </div>
    </div>
    <ThePagination @newPageNumber="setCurrentPage" :pagesCount="pagesCount"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ThePagination from './ThePagination.vue';

export default {
  name: 'TheAllBooks',

  components: {
    ThePagination,
  },

  data() {
    return {
      perPage: 6,
      currentPage: 1,
    };
  },

  computed: {
    ...mapState('books', [
      'books',
    ]),

    booksQuantity() {
      return Object.keys(this.books).length;
    },

    pagesCount() {
      return Math.ceil(this.booksQuantity / this.perPage);
    },

    booksArray() {
      const booksArray = [];
      Object.keys(this.books).forEach(key => booksArray.push(this.books[key]));
      return booksArray;
    },

    booksArrayToShow() {
      const firstBookOnPage = (this.currentPage * this.perPage) - this.perPage;
      const lastBookOnPage = this.perPage * this.currentPage;

      return this.booksArray.slice(firstBookOnPage, lastBookOnPage);
    },
  },

  methods: {
    showBookDetails(e) {
      const id = e.currentTarget.dataset.bookId;
      this.$router.push({
        name: 'book-details', params: { id },
      });
    },

    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
};
</script>

<style scoped>
  .card {
    height: 350px;
    cursor: pointer;
  }

  .card-header {
    position: relative;
  }

  .card-header .badge-success {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  img {
    max-width: 167px;
    max-height: 260px;
    width: 100%;
    height: 100%;
  }
</style>
