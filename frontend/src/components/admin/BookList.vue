<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ảnh sách</th>
          <th>Tên sách</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Tác giả</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(book, index) in paginatedBooks"
          :key="[book._id, currentPage, booksPerPage]"
          :class="{ active: index === activeIndex }"
          @click="updateActiveIndex(index + (currentPage-1)*booksPerPage)"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <img
              :src="'http://localhost:3000/uploads/' + book.thumbnail"
              class="img-book"
              alt="Product Image"
            />
          </td>
          <td>{{ book.bookTitle }}</td>
          <td>{{ book.price }}</td>
          <td>{{ book.quantity }}</td>
          <td>{{ book.author }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click="prevPage">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ active: pageNumber === currentPage }"
        >
          <a class="page-link" href="#" @click="changePage(pageNumber)">{{
            pageNumber
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    books: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  data() {
    return {
      currentPage: 1,
      booksPerPage: 4,
    };
  },
  computed: {
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.booksPerPage;
      const endIndex = startIndex + this.booksPerPage;
      return this.books.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.books.length / this.booksPerPage);
    },
  },
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.table thead {
  background-color: #007bff;
  color: #ffffff;
}

.table th,
.table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

.table th {
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.03em;
}

.table tbody tr {
  transition: background-color 0.3s ease;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.table tbody tr.active {
  background-color: #d6eaff;
}

.img-book {
  height: auto;
  width: 60px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding-left: 0;
  list-style: none;
}

.page-item {
  margin: 0 5px;
}

.page-item .page-link {
  display: block;
  padding: 8px 12px;
  color: #007bff;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.page-item .page-link:hover {
  background-color: #007bff;
  color: #ffffff;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: #ffffff;
  border-color: #007bff;
}

.page-item.disabled .page-link {
  color: #ddd;
  pointer-events: none;
}
</style>
