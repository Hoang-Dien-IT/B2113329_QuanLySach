<template>
  <div>
    <AppHeader />
    <div class="container mt-3 mb-3">
      <div class="add-new">Thêm đầu sách</div>
      <div class="form">
        <form @submit.prevent="add" enctype="multipart/form-data" method="post">
          <div class="form-item">
            <label class="label" for="bookTitle">Tên sách:</label>
            <input class="input" type="text" id="bookTitle" v-model="formData.bookTitle" />
          </div>

          <div class="form-item">
            <label class="label" for="price">Giá:</label>
            <input class="input" type="number" id="price" v-model="formData.price" />
          </div>

          <div class="form-item">
            <label class="label" for="quantity">Số lượng:</label>
            <input class="input" type="number" id="quantity" v-model="formData.quantity" />
          </div>

          <div class="form-item">
            <label class="label" for="author">Tác giả:</label>
            <input class="input" type="text" id="author" v-model="formData.author" />
          </div>

          <div class="form-item">
            <label class="label" for="publisherName">Tên nhà xuất bản:</label>
            <input class="input" type="text" id="publisherName" v-model="formData.publisherName" />
          </div>

          <div class="form-item">
            <label class="label" for="publishYear">Năm xuất bản:</label>
            <input class="input" type="text" id="publishYear" v-model="formData.publishYear" />
          </div>

          <div class="form-item">
            <label class="label" for="publisherAddress">Địa chỉ NXB:</label>
            <input class="input" type="text" id="publisherAddress" v-model="formData.publisherAddress" />
          </div>

          <div class="form-item">
            <label class="label" for="thumbnail">Ảnh sách:</label>
            <input class="input" type="file" id="thumbnail" accept="image/*" @change="handleFileUpload" />
          </div>

          <button type="submit" class="btn-submit">Tạo</button>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import AppFooter from "@/components/admin/AppFooter.vue";
import BookService from "@/services/admin/book.service";

export default {
  components: {
    AppFooter,
  },
  data() {
    return {
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

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.formData.thumbnail = file;
    },

    async add() {
      try {
        if (
          !this.formData.bookTitle ||
          !this.formData.price ||
          !this.formData.quantity ||
          !this.formData.author
        ) {
          toast.error("Please fill in all required fields.", { autoClose: 3000 });
          return;
        }

        const formData = new FormData();
        formData.append("bookTitle", this.formData.bookTitle);
        formData.append("price", this.formData.price);
        formData.append("quantity", this.formData.quantity);
        formData.append("publishYear", this.formData.publishYear);
        formData.append("publisherName", this.formData.publisherName);
        formData.append("publisherAddress", this.formData.publisherAddress);
        formData.append("author", this.formData.author);
        formData.append("thumbnail", this.formData.thumbnail);

        const response = await BookService.create(formData);
        console.log(response);

        toast.success("Added successfully!", { autoClose: 1200 });

        setTimeout(() => {
          this.$router.push({ name: "book" });
        }, 800);
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.error || "Error!";
        toast.error(errorMessage, { autoClose: 3000 });
      }
    },
  },
};
</script>

<style scoped>
/* Container styling */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Heading */
.add-new {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4caf50;
  text-align: center;
}

/* Form items */
.form-item {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.input {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #4caf50;
  outline: none;
}

.input[type="file"] {
  padding: 8px;
  font-size: 14px;
}

button.btn-submit {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

button.btn-submit:hover {
  background-color: #45a049;
}

@media (max-width: 600px) {
  .container {
    padding: 20px;
    width: 100%;
  }
}
</style>
