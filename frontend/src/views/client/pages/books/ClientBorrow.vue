<template>
  <div class="page-wrapper">
    <ClientAppHeader />

    <div class="container mt-3">
      <h3>Quyển sách đã mượn</h3>
      <p class="text-danger">
        <b><i>Lưu ý rằng, sách chỉ được mượn tối đa là 30 ngày.</i></b>
      </p>
      <template v-if="reader.borrow && reader.borrow.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th class="tr-thead">#</th>
              <th class="tr-thead">Ảnh sách</th>
              <th class="tr-thead">Tên sách</th>
              <th class="tr-thead">Số lượng</th>
              <th class="tr-thead">Ngày mượn</th>
              <th class="tr-thead">Ngày trả</th>
              <th class="tr-thead">Trạng thái</th>
              <th class="tr-thead">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(borrowedBook, index) in reader.borrow"
              :key="borrowedBook._id"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <img
                  :src="getBookImage(borrowedBook.id_book)"
                  alt="Book image"
                  width="100"
                />
              </td>
              <td>{{ getBookTitle(borrowedBook.id_book) }}</td>
              <td>{{ borrowedBook.quantity }}</td>
              <td>{{ borrowedBook.borrowDate }}</td>
              <td>{{ borrowedBook.returnDate }}</td>
              <td class="text-primary">
                {{ borrowedBook.status === 'accepted' ? 'Đã duyệt' : borrowedBook.status === 'refused' ? 'Từ chối' : borrowedBook.status === 'returned' ? 'Đã trả' : borrowedBook.status === 'processing' ? 'Chờ xử lí' : 'Unknown' }}
              </td>
              <td>
                <button
                  v-if="canDelete(borrowedBook.status)"
                  class="btn btn-danger"
                  @click="deleteBook(borrowedBook.id_book)"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-else>
        <p><i>Bạn chưa có đăng ký đơn mượn nào.</i></p>
      </template>
    </div>
    <ClientAppFooter />
  </div>
</template>

<script>
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ClientAppFooter from "@/components/client/ClientAppFooter.vue";
import BookService from "@/services/client/book.service";
import ReaderService from "@/services/client/reader.service";

export default {
  components: {
    ClientAppHeader,
    ClientAppFooter,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      books: [],
      reader: {},
    };
  },
  methods: {
    getTokenFromCookie() {
      // Phương thức để lấy token từ cookie
      const name = "tokenUser="; // Tên cookie chứa token
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return null;
    },
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async retrieveReader() {
      try {
        const tokenUser = this.getTokenFromCookie();

        let formData = new FormData();
        formData.append("tokenUser", tokenUser);

        this.reader = await ReaderService.retrieveReader(formData);
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
    canDelete(status) {
      return status === "processing" || status === "refused";
    },
    async deleteBook(id) {
      const respone = await ReaderService.deleteBook(id);
      this.retrieveBooks();
      this.retrieveReader();
      // Thực hiện xóa quyển sách đã mượn ở vị trí index trong mảng reader.borrow
      // Gọi API hoặc thực hiện các thao tác cần thiết để xóa quyển sách đã mượn
    },
  },
  mounted() {
    this.retrieveBooks();
    this.retrieveReader();
  },
};
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Đảm bảo chiều cao tối thiểu của container là chiều cao của màn hình */
  background-color: #f4f6f9;
  /* Màu nền nhạt để tạo cảm giác dễ nhìn */
}

.container {
  flex-grow: 1;
  /* Mở rộng container để chiếm hết phần còn lại của trang */
  padding: 30px;
  /* Tạo khoảng cách giữa nội dung và viền */
  background-color: white;
  /* Màu nền trắng cho phần nội dung */
  border-radius: 8px;
  /* Bo góc cho phần nội dung */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Hiệu ứng đổ bóng nhẹ */
}

h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  /* Tạo khoảng cách dưới tiêu đề */
}

.text-danger {
  font-size: 1rem;
  margin-bottom: 20px;
  /* Khoảng cách giữa ghi chú và bảng */
  color: #e74c3c;
  /* Màu đỏ cho thông báo */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 8px;
  /* Bo góc cho bảng */
  overflow: hidden;
}

.tr-thead {
  background-color: #8e44ad;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 10px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

td img {
  border-radius: 4px;
}

button {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c0392b;
  /* Màu nền khi hover */
}

button:focus {
  outline: none;
  /* Tắt outline khi focus */
}

.text-primary {
  font-weight: bold;
  color: #2980b9;
}

.page-wrapper p {
  font-size: 1.1rem;
  color: #34495e;
}

.page-wrapper i {
  font-style: italic;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
  /* Màu nền cho hàng chẵn */
}

tr:nth-child(odd) {
  background-color: #ffffff;
  /* Màu nền cho hàng lẻ */
}

tr:hover {
  background-color: #f1f1f1;
  /* Màu nền khi hover vào hàng */
}
</style>
