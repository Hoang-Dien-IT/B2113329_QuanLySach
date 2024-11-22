<!-- LoginForm.vue -->
<template>
  <div>
    <ClientAppHeader />
    <div class="login_page">
      <div class="container">
        <div class="login">Đăng nhập</div>
        <form @submit.prevent="login" class="form">
          <div class="form-item">
            <label for="email" class="label">Email:</label><br />
            <input
              v-model="formData.email"
              type="text"
              id="email"
              class="input"
            />
          </div>
          <div class="form-item">
            <label for="password" class="label">Password</label><br />
            <input
              v-model="formData.password"
              type="password"
              id="password"
              class="input"
            />
          </div>
          <button type="submit" class="btn btn-primary">Đăng nhập</button>
          <div class="register">
            Bạn chưa có tài khoản?
            <router-link :to="{ name: 'register-client' }">Đăng ký</router-link>
          </div>
        </form>
      </div>
    </div>
    <ClientAppFooter />
  </div>
</template>
  
  <script>
import AuthorizationServiceClient from "../../../../services/client/authorization.service";
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ClientAppFooter from "@/components/client/ClientAppFooter.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  components: {
    ClientAppHeader,
    ClientAppFooter,
  },
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
        const response = await AuthorizationServiceClient.submitLogin(
          this.formData
        );
        switch (response.data) {
          case "wrong info":
            // Đăng nhập không thành công
            toast.error(
              "Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập và thử lại.",
              {
                autoClose: 800,
              }
            );
            break;
          case "success":
            // Đăng nhập thành công
            toast.success("Đăng nhập thành công", {
              autoClose: 800,
            });
            setTimeout(() => {
              this.$router.push({ name: "book-client" });
            }, 1500);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
        toast.error("Username or password is incorrect", {
          autoClose: 800,
        });
      }
    },
  },
};
</script>
  
<style scoped>
.login_page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* Đảm bảo toàn bộ màn hình sẽ được phủ */
  background: url("@/assets/background_login.jpg") no-repeat center center fixed;
  /* Đặt hình nền cho trang đăng nhập */
  background-size: cover;
}

.container {
  width: 100%;
  max-width: 450px;
  padding: 30px 20px;
  background-color: #ffffff;
  /* Nền trắng cho form đăng nhập */
  border-radius: 10px;
  /* Bo góc mềm mại */
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  /* Thêm bóng đổ cho container */
  text-align: center;
  margin: 0 15px;
  /* Tăng khoảng cách từ các cạnh */
}

.login {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #333;
  /* Màu chữ cho tiêu đề */
}

.form {
  margin-top: 20px;
}

.form-item {
  margin: 15px 0;
  text-align: left;
}

.label {
  font-weight: 600;
  font-size: 16px;
  color: #555;
  /* Màu nhạt cho nhãn */
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 16px;
  color: #333;
  margin-top: 8px;
  /* Khoảng cách giữa nhãn và input */
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: #4e8cff;
  /* Màu viền khi focus */
  outline: none;
  box-shadow: 0 0 5px rgba(72, 132, 255, 0.3);
  /* Thêm bóng khi focus */
}

.input::placeholder {
  color: #aaa;
  /* Màu nhạt cho placeholder */
}

.btn {
  width: 100%;
  padding: 12px;
  background-color: #4e8cff;
  /* Màu nền cho nút đăng nhập */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #3b74cc;
  /* Màu nền khi hover */
}

.register {
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}

.register a {
  text-decoration: none;
  color: #4e8cff;
  font-weight: bold;
}

.register a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 600px) {
  .container {
    padding: 25px 15px;
    width: 90%;
  }

  .login {
    font-size: 28px;
  }
}
</style>
