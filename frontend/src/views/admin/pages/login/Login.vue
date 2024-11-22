<!-- LoginForm.vue -->
<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">Đăng nhập</div>
      <form @submit.prevent="login" class="login-form">
        <div class="form-item">
          <label for="email" class="form-label">Email:</label>
          <input v-model="formData.email" type="text" id="email" class="form-input" placeholder="Nhập email của bạn" />
        </div>
        <div class="form-item">
          <label for="password" class="form-label">Mật khẩu:</label>
          <input v-model="formData.password" type="password" id="password" class="form-input"
            placeholder="Nhập mật khẩu của bạn" />
        </div>
        <button type="submit" class="btn-submit">Đăng nhập</button>
        <div class="register-text">
          Bạn chưa có tài khoản?
          <router-link :to="{ name: 'register' }" class="register-link">Đăng ký</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthorizationServiceAdmin from "../../../../services/admin/authorization.service";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthorizationServiceAdmin.submitLogin(this.formData);
        switch (response.data) {
          case "wrong info":
            toast.error("Đăng nhập không thành công. Vui lòng kiểm tra thông tin.", {
              autoClose: 800,
            });
            break;
          case "success":
            toast.success("Đăng nhập thành công", { autoClose: 800 });
            setTimeout(() => {
              this.$router.push({ name: "book" });
            }, 1500);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại.", { autoClose: 800 });
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); */
  background-image: url("/admin/background_register.png");
  color: #fff;
  font-family: Arial, sans-serif;
}

.login-container {
  width: 90%;
  max-width: 400px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-header {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-item {
  margin-bottom: 15px;
  text-align: left;
}

.form-label {
  font-weight: bold;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.form-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: border 0.3s ease;
}

.form-input:focus {
  border-color: #6a11cb;
  outline: none;
  background-color: #fff;
}

.btn-submit {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-submit:hover {
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
}

.register-text {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.register-link {
  color: #2575fc;
  font-weight: bold;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
