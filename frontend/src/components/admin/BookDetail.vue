<template>
  <div class="book-details-container">
    <div class="image-container">
      <img :src="'http://localhost:3000/uploads/' + book.thumbnail" class="img-book" alt="Book Thumbnail">
    </div>
    <hr class="divider">
    <div class="info-container">
      <div class="info-item">
        <strong class="label">Tên sách:</strong>
        <span>{{ book.bookTitle }}</span>
      </div>
      <div class="info-item">
        <strong class="label">Giá:</strong>
        <span>{{ book.price }} VND</span>
      </div>
      <div class="info-item">
        <strong class="label">Số lượng:</strong>
        <span>{{ book.quantity }}</span>
      </div>
      <div class="info-item">
        <strong class="label">Tác giả:</strong>
        <span>{{ book.author }}</span>
      </div>
      <hr class="divider">
      <div class="info-item">
        <strong class="label">Tên nhà xuất bản:</strong>
        <span>{{ book.publisherName }}</span>
      </div>
      <div class="info-item">
        <strong class="label">Năm xuất bản:</strong>
        <span>{{ book.publishYear }}</span>
      </div>
      <div class="info-item">
        <strong class="label">Địa chỉ NXB:</strong>
        <span>{{ book.publisherAddress }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: { type: Object, required: true },
  },
};
</script>

<style scoped>
.book-details-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  max-width: 400px;
  margin: 0 auto;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.img-book {
  height: auto;
  width: 150px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.divider {
  border: 0;
  height: 1px;
  background: #e0e0e0;
  margin: 16px 0;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #333;
}

span {
  color: #555;
}
</style>
