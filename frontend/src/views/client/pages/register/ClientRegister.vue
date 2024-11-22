<template>
  <div>
    <ClientAppHeader />

    <div class="container mt-3 mb-3">
      <div class="add-new">Đăng kí tài khoản</div>
      <div class="form">
        <form @submit.prevent="add" action="">
          <div class="form-item">
            <label class="label" for="fullName">Họ và tên:</label><br />
            <input
              class="input"
              type="text"
              id="fullName"
              v-model="formData.fullName"
            />
          </div>
          <div class="form-item">
            <label class="label" for="email">Email:</label><br />
            <input
              class="input"
              type="email"
              id="email"
              v-model="formData.email"
            />
          </div>
          <div class="form-item">
            <label class="label" for="password">Password:</label><br />
            <input
              class="input"
              type="password"
              id="password"
              v-model="formData.password"
            />
          </div>

          <div class="form-item">
            <label class="label" for="address">Địa chỉ:</label><br />
            <input
              class="input"
              type="text"
              id="address"
              v-model="formData.address"
            />
          </div>

          <div class="form-item">
            <label class="label" for="phone">Số điện thoại:</label><br />
            <input
              class="input"
              type="text"
              id="phone"
              v-model="formData.phone"
            />
          </div>

          <button type="submit" class="btn btn-primary">Tạo</button>
        </form>
      </div>
    </div>
    <ClientAppFooter/>
  </div>
</template>
  
  <script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ClientAppFooter from "@/components/client/ClientAppFooter.vue";
import ReaderService from "@/services/client/reader.service";

export default {
  components: {
    ClientAppHeader,
    ClientAppFooter,
  },
  data() {
    return {
      formData: {
        fullName: "",
        email: "",
        password: "",
        address: "",
        phone: "",
      },
    };
  },

  computed: {},

  methods: {
    async add() {
      try {
        if (
          !this.formData.fullName ||
          !this.formData.email ||
          !this.formData.password
        ) {
          toast.error("Please fill in all required fields.", {
            autoClose: 3000,
          });
          return;
        }

        const formData = new FormData();
        formData.append("fullName", this.formData.fullName);
        formData.append("email", this.formData.email);
        formData.append("password", this.formData.password);
        formData.append("address", this.formData.address);
        formData.append("phone", this.formData.phone);

        const response = await ReaderService.create(this.formData);
        toast.success("Added successfully!", {
          autoClose: 1200,
        });

        setTimeout(() => {
          this.$router.push({ name: "login-client" });
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
/* Container for the form */
.container {
  width: 100%;
  max-width: 480px;
  height: auto;
  text-align: center;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 40px auto;
}

/* Header for the form */
.add-new {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

/* Form items, each input field section */
.form-item {
  text-align: left;
  margin-bottom: 20px;
}

/* Label style */
.label {
  font-size: 16px;
  font-weight: 500;
  color: #444;
  margin-bottom: 8px;
  display: block;
}

/* Input field styles */
.input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #007bff;
  outline: none;
  background-color: #fff;
}

/* Button style */
button {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Responsive design for smaller screens */
@media (max-width: 600px) {
  .container {
    width: 90%;
    padding: 20px;
  }

  .add-new {
    font-size: 24px;
  }

  .input {
    padding: 10px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    font-size: 16px;
  }
}
</style>
