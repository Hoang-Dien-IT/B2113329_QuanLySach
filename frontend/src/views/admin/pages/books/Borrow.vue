<template>
  <div>
    <AppHeader />
    <div class="container mt-4">
      <h3 class="section-title">
        <b><i>Các đơn mượn sách</i></b>
      </h3>
      <div v-for="(reader, readerIndex) in readers" :key="readerIndex">
        <template v-if="reader.borrow.length > 0">
          <h4 class="reader-name">Độc giả: {{ reader.fullName }}</h4>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Ảnh sách</th>
                <th>Tên sách</th>
                <th>Số lượng</th>
                <th>Ngày mượn</th>
                <th>Ngày trả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(borrowedBook, bookIndex) in reader.borrow" :key="bookIndex">
                <td>{{ bookIndex + 1 }}</td>
                <td>
                  <img :src="getBookImage(borrowedBook.id_book)" alt="Book image" class="book-image" />
                </td>
                <td>{{ getBookTitle(borrowedBook.id_book) }}</td>
                <td>{{ borrowedBook.quantity }}</td>
                <td>{{ borrowedBook.borrowDate }}</td>
                <td>{{ borrowedBook.returnDate }}</td>
                <td class="status">
                  {{
                    borrowedBook.status === 'accepted' ? 'Đã duyệt' :
                      borrowedBook.status === 'refused' ? 'Từ chối' :
                        borrowedBook.status === 'returned' ? 'Đã trả' :
                          borrowedBook.status === 'processing' ? 'Chờ xử lí' :
                            'Unknown'
                  }}
                </td>
                <td>
                  <button @click="changeStatus(reader, borrowedBook, 'accepted')" class="btn btn-success btn-action">
                    Duyệt
                  </button>
                  <button @click="changeStatus(reader, borrowedBook, 'refused')" class="btn btn-danger btn-action">
                    Từ chối
                  </button>
                  <button @click="changeStatus(reader, borrowedBook, 'returned')" class="btn btn-warning btn-action">
                    Đã trả
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/admin/AppHeader.vue";
import BookService from "@/services/admin/book.service";
import EmplpoyeeService from "@/services/admin/employee.service";
import AppFooter from "@/components/admin/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      books: [],
      readers: [],
    };
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async retrieveReaders() {
      try {
        this.readers = await EmplpoyeeService.retrieveAllReaders();
      } catch (error) {
        console.log(error);
      }
    },
    async changeStatus(reader, borrowedBook, status) {
      try {
        const response = await EmplpoyeeService.changeStatus(
          reader._id,
          borrowedBook.id_book,
          status
        );
        // Refresh data after changing status
        await this.retrieveReaders();
        await this.retrieveBooks();
      } catch (error) {
        console.log(error);
      }
    },
    getBookTitle(bookId) {
      const book = this.books.find((book) => book._id === bookId);
      return book ? book.bookTitle : "Unknown";
    },
    getBookImage(bookId) {
      const book = this.books.find((book) => book._id === bookId);
      return book ? "http://localhost:3000/uploads/" + book.thumbnail : ""; // Assuming `imageUrl` is the field that stores the image URL in your book object
    },
  },
  mounted() {
    this.retrieveBooks();
    this.retrieveReaders();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 24px;
  color: #d9534f;
  text-align: center;
  margin-bottom: 30px;
}

.reader-name {
  font-size: 20px;
  margin-top: 20px;
  color: #333;
}

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table thead {
  background-color: #f1f1f1;
}

.tr-thead {
  background-color: #c6f0a1;
}

.book-image {
  width: 80px;
  height: auto;
  border-radius: 4px;
}

.status {
  color: #5bc0de;
}

.btn-action {
  margin-right: 10px;
  font-size: 14px;
}

.btn-action:hover {
  transform: scale(1.05);
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-success:hover,
.btn-danger:hover,
.btn-warning:hover {
  opacity: 0.8;
}
</style>
