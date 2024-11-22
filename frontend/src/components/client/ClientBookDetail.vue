<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <img :src="'http://localhost:3000/uploads/' + book.thumbnail" alt="" class="book-thumbnail">
      </div>
      <div class="col-4 book-details">
        <div class="p-1">
          <strong>Tên sách:</strong>
          {{ book.bookTitle }}
        </div>
        <div class="p-1">
          <strong>Giá: </strong>
          {{ book.price }}
        </div>
        <div class="p-1">
          <strong>Số lượng: </strong>
          {{ book.quantity }}
        </div>
        <div class="p-1">
          <strong>Số lượng sách còn lại: </strong>
          {{ remainingBooks }}
        </div>
        <div class="p-1">
          <strong>Tác giả:</strong>
          {{ book.author }}
        </div>
        <div class="p-1">
          <strong>Tên nhà xuất bản:</strong>
          {{ book.publisherName }}
        </div>
        <div class="p-1">
          <strong>Năm xuất bản:</strong>
          {{ book.publishYear }}
        </div>
        <div class="p-1">
          <strong>Địa chỉ NXB:</strong>
          {{ book.publisherAddress }}
        </div>
      </div>
      <div class="col-4">
        <h4>Đăng ký mượn sách</h4>
        <div class="form">
          <form @submit.prevent="add" action="" enctype="multipart/form-data" method="post">
            <div class="form-item mb-3">
              <label class="label" for="quantity">Số lượng:</label><br />
              <input class="input" type="number" id="quantity" min="1" max="3" required v-model="formData.quantity" />
            </div>
            <div class="form-item mb-3">
              <label class="label" for="borrowDate">Ngày mượn:</label><br />
              <input class="input" type="date" id="borrowDate" required v-model="formData.borrowDate" />
            </div>
            <div class="form-item mb-3">
              <label class="label" for="returnDate">Ngày trả:</label><br />
              <input class="input" type="date" id="returnDate" required v-model="formData.returnDate" />
            </div>

            <button type="submit" class="btn btn-primary mb-3">Đăng ký mượn</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ReaderService from "@/services/client/reader.service";

export default {
  props: {
    book: { type: Object, required: true },
  },
  data() {
    return {
      formData: {
        quantity: 1,
        borrowDate: "",
        returnDate: "",
        book_id: this.book._id,
      },
      remainingBooks: 0,
    };
  },
  watch: {
    // Giám sát sự thay đổi của prop 'book'
    book: {
      handler() {
        // Gọi phương thức updateRemainingBooks() mỗi khi prop 'book' thay đổi
        this.updateRemainingBooks();
      },
      deep: true, // Giám sát sâu vào các thuộc tính của 'book'
    },
  },
  methods: {
    async add() {
      try {
        const formData = new FormData();
        formData.append("quantity", this.formData.quantity);
        formData.append("book_id", this.formData.book_id);
        formData.append("borrowDate", this.formData.borrowDate);
        formData.append("returnDate", this.formData.returnDate);
        console.log(this.formData)
        const response = await ReaderService.addBook(this.formData);
        toast.success("Added successfully!", {
          autoClose: 1200,
        });

        setTimeout(() => {
          this.$router.push({ name: "borrow-client" });
        }, 800);
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.error || "Số lượng sách không đủ để mượn!";
        toast.error(errorMessage, { autoClose: 3000 });
        setTimeout(() => {
          this.$router.push({ name: "borrow-client" });
        }, 800);
      }
    },
    async updateRemainingBooks() {
      try {
        const response = await ReaderService.getNumberBookBorrowed(this.book._id);
        this.remainingBooks = this.book.quantity - response;
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.error || "Error!";
        toast.error(errorMessage, { autoClose: 3000 });
      }
    },
  },
  mounted() {
    this.updateRemainingBooks();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1100px;
  /* Giới hạn chiều rộng container */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  /* Cho phép các phần tử xuống dòng khi không đủ không gian */
}

.book-thumbnail {
  width: 100%;
  max-width: 250px;
  /* Giới hạn chiều rộng ảnh */
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.book-details {
  flex: 1;
  /* Cho phép phần chi tiết co giãn linh hoạt */
  min-width: 250px;
  /* Đảm bảo không bị quá nhỏ */
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

h4 {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}

.form {
  flex: 1;
  /* Đảm bảo form co giãn linh hoạt theo kích thước màn hình */
  min-width: 250px;
  /* Kích thước tối thiểu để form không bị bóp méo */
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.form-item {
  margin-bottom: 12px;
}

.form-item label {
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.form-item input {
  width: 100%;
  /* Input chiếm toàn bộ chiều rộng của form */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border 0.3s ease;
}

.form-item input:focus {
  border-color: #007bff;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
    /* Các phần tử xếp chồng lên nhau trên màn hình nhỏ */
  }

  .book-thumbnail {
    max-width: 100%;
    /* Đảm bảo ảnh không bị tràn */
  }

  .book-details,
  .form {
    width: 100%;
    /* Form và chi tiết chiếm toàn bộ chiều rộng */
    min-width: unset;
    /* Bỏ giới hạn chiều rộng tối thiểu trên màn hình nhỏ */
    padding: 12px;
    /* Giảm padding trên màn hình nhỏ */
  }

  h4 {
    font-size: 16px;
    /* Giảm kích thước tiêu đề trên màn hình nhỏ */
  }

  .form-item input {
    font-size: 16px;
    /* Tăng kích thước font input cho di động */
  }

  .btn {
    font-size: 16px;
    /* Nút lớn hơn trên di động */
  }
}
</style>