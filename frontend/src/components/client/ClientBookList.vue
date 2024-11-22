<template>
  <div class="mb-5">
    <div class="book-grid">
      <div
        class="book-card"
        v-for="(book, index) in paginatedBooks"
        :key="[book._id, currentPage, itemsPerPage]"
        :class="{ active: index === activeIndex }"
        @click="updateActiveIndex(index + (currentPage-1)*itemsPerPage)"
      >
        <img
          :src="'http://localhost:3000/uploads/' + book.thumbnail"
          class="img-book"
          alt="Ảnh sách"
          style="border-top-left-radius: 10px;border-top-right-radius: 10px;"
        />
        <div class="book-details">
          <h4 class="text-primary m-1"><b>{{ book.bookTitle }}</b></h4>
          <p class="m-1"><b>Giá:</b> {{ book.price }}</p>
          <p class="m-1"><b>Số lượng:</b> {{ book.quantity }}</p>
          <p class="m-1"><b>Tác giả:</b> {{ book.author }}</p>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
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
      itemsPerPage: 10,
    };
  },
  computed: {
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.books.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
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
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Tự động điều chỉnh số cột */
  gap: 20px;
  /* Khoảng cách giữa các ô sách */
  padding: 20px;
  /* Thêm khoảng cách bên trong */
  justify-content: center;
  /* Căn giữa các phần tử */
}

.book-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  /* Màu biên nhạt hơn */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Tạo hiệu ứng đổ bóng */
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* Hiệu ứng khi hover */
  overflow: hidden;
}

.book-card:hover {
  transform: translateY(-5px);
  /* Nâng lên nhẹ khi hover */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  /* Tăng hiệu ứng bóng */
  border-color: #007bff;
  /* Đổi màu viền khi hover */
}

.img-book {
  width: 100%;
  height: 200px;
  /* Chiều cao cố định cho hình ảnh */
  object-fit: cover;
  /* Cắt hình ảnh phù hợp */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.book-details {
  padding: 15px;
  text-align: left;
  /* Căn chữ sang trái */
}

.book-details h4 {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  /* Màu tiêu đề */
  margin: 10px 0;
}

.book-details p {
  font-size: 14px;
  color: #555555;
  /* Màu chữ miêu tả */
  margin: 5px 0;
}

.active {
  border-color: #007bff;
  /* Viền xanh lam khi chọn */
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  /* Căn giữa nút phân trang */
  gap: 10px;
  /* Khoảng cách giữa các nút */
}

.pagination button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.pagination button:disabled {
  background-color: #cccccc;
  /* Màu xám cho nút bị vô hiệu */
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #0056b3;
  /* Màu đậm hơn khi hover */
  transform: translateY(-2px);
  /* Hiệu ứng hover cho nút */
}

@media (max-width: 768px) {
  .book-grid {
    gap: 15px;
    /* Giảm khoảng cách trên màn hình nhỏ */
    padding: 10px;
  }

  .book-card {
    max-width: 100%;
    /* Giãn hết chiều rộng */
  }

  .pagination button {
    font-size: 12px;
    /* Kích thước nhỏ hơn */
    padding: 8px 12px;
  }
}
</style>
