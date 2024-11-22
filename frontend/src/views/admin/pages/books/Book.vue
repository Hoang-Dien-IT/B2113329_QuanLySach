<template>
  <div>
    <AppHeader />
    <div class="container mt-3">
      <div class="page row">
        <div class="col-md-10">
          <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-8">
          <h4>
            Sách
            <i class="fa-solid fa-book"></i>
          </h4>

          <div class="">
            <button
              class="btn btn-sm btn-primary custom-margin"
              @click="refreshList()"
            >
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <button
              class="btn btn-sm btn-success custom-margin"
              @click="goToAddBook"
            >
              <i class="fas fa-plus"></i> Thêm mới
            </button>
            <button
              class="btn btn-sm btn-danger custom-margin"
              @click="removeAllBooks"
            >
              <i class="fas fa-trash"></i> Xóa tất cả
            </button>
          </div>

          <BookList
            v-if="filteredBooksCount > 0"
            :books="filteredBooks"
            v-model:activeIndex="activeIndex"
          />
          <p v-else>Không có liên hệ nào.</p>
        </div>

        <div class="mt-3 col-4">
          <div v-if="activeBook">
            <h4>
              Chi tiết đầu sách
              <i class="fa-solid fa-book"></i>
            </h4>
            <BookDetail :book="activeBook" />
            <router-link
              :to="{
                name: 'book.edit',
                params: { id: activeBook._id },
              }"
            >
              <span class="mt-2 badge badge-warning" style="color: blue">
                <i class="fas fa-edit"></i> Hiệu chỉnh
              </span>
            </router-link>
            <span
              class="mt-2 badge badge-warning"
              style="color: red; cursor: pointer"
              @click="removeOneBook(activeBook)"
            >
              <i class="fa-solid fa-trash"></i> Xóa
            </span>
          </div>
        </div>
      </div>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import BookDetail from "@/components/admin/BookDetail.vue";
import AppHeader from "@/components/admin/AppHeader.vue";
import AppFooter from "@/components/admin/AppFooter.vue";
import InputSearch from "@/components/admin/InputSearch.vue";
import BookList from "@/components/admin/BookList.vue";
import BookService from "@/services/admin/book.service";

export default {
  components: {
    BookDetail,
    InputSearch,
    BookList,
    AppHeader,
    AppFooter,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng book thành chuỗi để tiện cho tìm kiếm.
    booksStrings() {
      return this.books.map((book) => {
        const {
          bookTitle,
          price,
          quantity,
          publishYear,
          author,
          thumbnail,
        } = book;
        return [
          bookTitle,
          price,
          quantity,
          publishYear,
          author,
          thumbnail,
        ].join("");
      });
    },
    // Trả về các book có chứa thông tin cần tìm kiếm.
    filteredBooks() {
      if (!this.searchText) return this.books;

      return this.books.filter((_book, index) =>
        this.booksStrings[index].includes(this.searchText)
      );
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveBooks();
      this.searchText = "";
      this.activeIndex = -1;
    },
    async removeOneBook(book) {
      if (confirm("Bạn muốn xóa cuốn sách này?")) {
        try {
          await BookService.delete(book._id);
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async removeAllBooks() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await BookService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddBook() {
      this.$router.push({ name: "book.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
/* Tổng thể */
.page {
  text-align: left;
  font-family: 'Arial', sans-serif;
}

/* Định dạng các nút */
.custom-margin {
  margin-right: 10px;
}

button {
  border-radius: 5px;
  /* Bo góc nút */
  padding: 8px 16px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s, transform 0.2s;
}

button i {
  margin-right: 6px;
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #c82333;
}

/* Phần thông tin chi tiết */
h4 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

h4 i {
  margin-left: 8px;
}

.container {
  padding-top: 20px;
}

.page .row {
  display: flex;
  gap: 20px;
}

.col-md-10,
.col-8,
.col-4 {
  padding: 0;
}

.mt-3 {
  margin-top: 20px;
}

.mt-3 .col-8,
.mt-3 .col-4 {
  padding-right: 15px;
}

.mt-3 .col-4 {
  border-left: 1px solid #ddd;
  padding-left: 15px;
}

.book-list {
  margin-top: 20px;
}

.book-list p {
  color: #777;
  font-style: italic;
}

/* Phần danh sách sách */
.book-list .book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
  transition: background-color 0.3s ease;
}

.book-list .book-item:hover {
  background-color: #f8f9fa;
}

.book-list .book-item.active {
  background-color: #f1f1f1;
}

.book-list .book-item .title {
  font-weight: bold;
  color: #333;
}

.book-list .book-item .details {
  color: #888;
}

/* Phần hiển thị chi tiết sách */
.book-detail {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.book-detail h4 {
  font-size: 18px;
  color: #444;
}

.book-detail p {
  color: #666;
  font-size: 14px;
}

.book-detail .badge {
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
}

.book-detail .badge:hover {
  color: #0056b3;
}

.book-detail .badge-warning {
  color: orange;
}

.book-detail .badge-danger {
  color: red;
}
</style>
