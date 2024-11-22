<template>
  <div>
    <AppHeader />
    <div class="container mt-3">
      <div class="add-new">Hiệu chỉnh đầu sách</div>
      <div class="form">
        <form @submit.prevent="updateBook()">
          <div class="form-item">
            <label class="label" for="bookTitle">Tên sách:</label>
            <input class="input" type="text" id="bookTitle" v-model="formData.bookTitle" placeholder="Nhập tên sách" />
          </div>

          <div class="form-item">
            <label class="label" for="price">Giá:</label>
            <input class="input" type="number" id="price" v-model="formData.price" placeholder="Nhập giá sách" />
          </div>

          <div class="form-item">
            <label class="label" for="quantity">Số lượng:</label>
            <input class="input" type="number" id="quantity" v-model="formData.quantity" placeholder="Nhập số lượng" />
          </div>

          <div class="form-item">
            <label class="label" for="author">Tác giả:</label>
            <input class="input" type="text" id="author" v-model="formData.author" placeholder="Nhập tên tác giả" />
          </div>

          <div class="form-item">
            <label class="label" for="publisherName">Tên nhà xuất bản:</label>
            <input class="input" type="text" id="publisherName" v-model="formData.publisherName"
              placeholder="Nhập tên nhà xuất bản" />
          </div>

          <div class="form-item">
            <label class="label" for="publishYear">Năm xuất bản:</label>
            <input class="input" type="text" id="publishYear" v-model="formData.publishYear"
              placeholder="Nhập năm xuất bản" />
          </div>

          <div class="form-item">
            <label class="label" for="publisherAddress">Địa chỉ NXB:</label>
            <input class="input" type="text" id="publisherAddress" v-model="formData.publisherAddress"
              placeholder="Nhập địa chỉ nhà xuất bản" />
          </div>

          <div class="form-item">
            <label class="label" for="thumbnail">Ảnh sách:</label>
            <input class="input file-input" type="file" id="thumbnail" accept="image/*" @change="handleFileUpload" />
            <div v-if="formData.thumbnail" class="file-info">
              <span>{{ getFileName(formData.thumbnail) }}</span>
              <div v-if="imageChanged" class="info">{{ info }}</div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Cập nhật</button>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import BookService from "@/services/admin/book.service";
import AppFooter from "@/components/admin/AppFooter.vue";

export default {
  components: {
    AppFooter,
  },
  data() {
    return {
      info: "Đang cập nhật ảnh",
      imageChanged: false,
      formData: {
        id_publisher: "",
        bookTitle: "",
        price: 0,
        quantity: 0,
        publishYear: "",
        author: "",
        thumbnail: null,
      },
    };
  },
  mounted() {
    this.retrieve(this.$route.params.id);
  },

  methods: {
    async retrieve(bookId) {
      try {
        const book = await BookService.get(bookId);
        if (book) {
          this.formData.bookTitle = book.bookTitle;
          this.formData.price = book.price;
          this.formData.quantity = book.quantity;
          this.formData.author = book.author;
          this.formData.publishYear = book.publishYear;
          this.formData.publisherName = book.publisherName;
          this.formData.publisherAddress = book.publisherAddress;
          this.formData.thumbnail = book.thumbnail;
        } else {
          console.log("Book not found");
        }

        console.log(book);
      } catch (error) {
        console.log(error);
      }
    },

    getFileName(file) {
      // Extract and return only the file name
      return file instanceof File ? file.name : file;
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      this.formData.thumbnail = file;
      this.imageChanged = true;
    },

    async updateBook() {
      try {
        if (
          !this.formData.bookTitle ||
          !this.formData.price ||
          !this.formData.quantity ||
          !this.formData.author
        ) {
          toast.error("Please fill in all required fields.", {
            autoClose: 3000,
          });
          return;
        }

        const formData = new FormData();
        formData.append("bookTitle", this.formData.bookTitle);
        formData.append("price", this.formData.price);
        formData.append("quantity", this.formData.quantity);
        formData.append("publishYear", this.formData.publishYear); // Append the image file
        formData.append("publisherName", this.formData.publisherName);
        formData.append("publisherAddress", this.formData.publisherAddress);
        formData.append("author", this.formData.author);
        formData.append("thumbnail", this.formData.thumbnail);
        const response = await BookService.update(
          this.$route.params.id,
          formData
        );
        console.log(response);
        alert("Sách đã được cập nhật");
        this.$router.push({ name: "book" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-new {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.label {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.input {
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;
}

.input:focus {
  outline: none;
  border-color: #007bff;
}

.file-input {
  border: 1px solid #ccc;
}

.file-info {
  margin-top: 5px;
}

.file-info span {
  font-size: 14px;
  color: #555;
}

.info {
  font-size: 14px;
  color: green;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
