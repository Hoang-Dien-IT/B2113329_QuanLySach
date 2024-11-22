<template>
  <div>
    <ClientAppHeader />
    <div class="container mt-3">
      <div class="page row">
        <img src="/client/bannerhome.png" alt="" class="mb-3" />
        <div class="col-md-12">
          <ClientInputSearch v-model="searchText" />
        </div>
        <div class="pt-3">
          <div class="">
            <button class="btn btn-sm btn-primary custom-margin mb-3" @click="refreshList()">
              <i class="fas fa-redo"></i> Làm mới
            </button>
          </div>

          <ClientBookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
          <p v-else>Không có sách trong kho.</p>
        </div>
        <!-- Overlay và phần chi tiết sách -->

        <div v-if="activeBook" class="overlay-container" @mousedown="handleOverlayClick">
          <div class="overlay">
            <div class="book-details-container">
              <div>
                <h4>
                  Chi tiết đầu sách
                  <i class="fa-solid fa-book"></i>
                </h4>
                <ClientBookDetail :book="activeBook" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ClientAppFooter />
  </div>
</template>

<script>
import ClientBookDetail from "@/components/client/ClientBookDetail.vue";
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ClientAppFooter from "@/components/client/ClientAppFooter.vue";
import ClientInputSearch from "@/components/client/ClientInputSearch.vue";
import ClientBookList from "@/components/client/ClientBookList.vue";
import BookService from "@/services/client/book.service";

export default {
  components: {
    ClientBookDetail,
    ClientInputSearch,
    ClientBookList,
    ClientAppHeader,
    ClientAppFooter,
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
          id_publisher,
          bookTitle,
          price,
          quantity,
          publishYear,
          author,
          thumbnail,
        } = book;
        return [
          id_publisher,
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
    handleOverlayClick(event) {
      // Kiểm tra xem người dùng có nhấp vào phần chi tiết sách hay không
      const isInsideDetail = event.target.closest('.book-details-container');
      if (!isInsideDetail) {
        // Nếu không, đóng overlay
        this.closeOverlay();
      }
    },
    closeOverlay() {
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
/* Trang chính */
.page {
  text-align: left;
  padding: 0 15px;
}

/* Nút làm mới */
.custom-margin {
  margin-right: 10px;
}

/* Container chi tiết sách */
.book-details-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 70%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  /* Đảm bảo cuộn nếu nội dung dài */
  max-height: 90%;
}

/* Phần overlay nền tối */
.overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  /* Giúp các sự kiện không bị chặn */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  pointer-events: all;
  /* Cho phép tương tác với overlay */
}

/* Banner hình ảnh */
img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  /* Cắt ảnh sao cho đẹp nhất */
}

/* Phần input tìm kiếm */
input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-sizing: border-box;
}

/* Button làm mới */
button.btn.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button.btn.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

/* Danh sách sách */
ul.book-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.book-list-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.book-list-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Tạo không gian giữa các mục */
.book-list-item+.book-list-item {
  margin-top: 15px;
}

/* Tăng chiều rộng và chiều cao của hình ảnh trong danh sách */
.book-list-item img {
  max-width: 100px;
  max-height: 150px;
  margin-right: 15px;
  border-radius: 8px;
  object-fit: cover;
}

/* Title của sách */
.book-list-item h5 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* Description của sách */
.book-list-item p {
  margin: 0;
  color: #777;
  font-size: 14px;
}
</style>
