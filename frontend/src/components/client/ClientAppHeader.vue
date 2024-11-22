<template>
  <div>
    <div class="container d-flex justify-content-between">
      <div>Bạn cần hỗ trợ: <b class="text-danger">02871086979</b></div>
      <div> Hệ thống cửa hàngLiên hệ hỗ trợ (07:30 - 17:00)</div>
    </div>
    <nav class="navbar navbar-expand">
      <div class="navbar-brand-container">
        <a href="/books" class="navbar-brand">
          <img src="/client/BookLoaner.png" alt="" />
        </a>
        <div class="mr-auto navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'book-client' }" class="nav-link"
              :class="{ 'active-link': $route.name === 'book-client' }">
              <h5><b>Sách</b></h5>
              <i class="fa-solid fa-book"></i>
            </router-link>
          </li>
          <li class="nav-item" style="width: 140px">
            <router-link :to="{ name: 'borrow-client' }" class="nav-link"
              :class="{ 'active-link': $route.name === 'borrow-client' }">
              <h5><b>Đơn Mượn</b></h5>
              <i class="fa-solid fa-basket-shopping"></i>
            </router-link>
          </li>
        </div>
      </div>
      <div class="login-logout-register-container">
        <div v-if="isLoggedIn">
          <button class="btn btn-primary">
            <router-link :to="{ name: 'infor-client' }" class="nav-link" style="margin:0;">
              Thông tin cá nhân
            </router-link>
          </button>
          <button class="btn btn-danger button-logout" @click="logout">
            Đăng Xuất
          </button>
        </div>
        <div v-else>
          <button class="btn btn-primary button-login" @click="login">
            Đăng Nhập
          </button>
          <!-- <button class="btn btn-danger button-register" @click="register">
            Đăng Ký
          </button> -->
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Authorization from "@/services/client/authorization.service";
export default {
  data() {
    return {
      isLoggedIn: false, // Ban đầu chưa đăng nhập
    };
  },
  created() {
    this.checkLoggedIn(); // Gọi phương thức kiểm tra đăng nhập khi component được tạo
  },
  computed: {},
  name: "app-header-admin",
  methods: {
    checkLoggedIn() {
      const token = this.getTokenFromCookie(); // Phương thức để lấy token từ cookie
      if (token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
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
    login() {
      // Xử lý đăng nhập ở đây
      this.$router.push({ name: "login-client" });
      // this.isLoggedIn = true;
    },
    logout() {
      // Xử lý đăng xuất ở đây
      try {
        const respone = Authorization.logOut();
        // this.isLoggedIn = false;
        this.$router.push({ name: "login-client" });
      } catch (error) {
        console.log(error);
      }
    },
    register() {
      // Xử lý đăng ký ở đây
      this.$router.push({ name: "register-client" });
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  /* Nền tối */
  height: 100px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  /* Bóng mờ */
  padding: 0 30px;
  /* Khoảng cách bên trong */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Chia đều khoảng cách hai bên */
}

/* Phần logo và liên kết chính */
.navbar-brand-container {
  display: flex;
  align-items: center;
  gap: 30px;
  /* Khoảng cách giữa logo và menu */
}

/* Logo của navbar */
.navbar-brand {
  display: flex;
  align-items: center;
  margin-left: 10%;
}

.navbar-brand img {
  max-height: 60px;
  object-fit: contain;
  /* Giữ kích thước ảnh cân đối */
}

/* Danh sách liên kết chính */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  /* Khoảng cách giữa các mục */
}

.nav-item {
  text-align: center;
}

/* Định dạng link */
.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ecf0f1;
  /* Chữ sáng */
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s, transform 0.2s;
  /* Hiệu ứng hover */
  text-decoration: none;
}

.nav-link:hover {
  color: #1abc9c;
  /* Màu xanh nổi bật */
  transform: scale(1.1);
  /* Phóng to nhẹ */
}

/* Icon và chữ bên trong link */
.fa-book,
.fa-basket-shopping {
  margin-top: 5px;
  font-size: 20px;
}

.nav-link.active-link {
  text-decoration: underline;
  color: #1abc9c;
  /* Màu nhấn mạnh */
}

/* Container của phần đăng nhập, đăng ký, đăng xuất */
.login-logout-register-container {
  display: flex;
  align-items: center;
  gap: 15px;
  /* Tăng khoảng cách giữa các nút */
}

/* Định dạng nút chung */
.btn-primary,
.btn-danger {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  transition: all 0.3s ease;
}

/* Nút đăng nhập */
.btn-primary {
  background-color: #1abc9c;
  color: #fff;
}

.btn-primary:hover {
  background-color: #16a085;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Nút đăng xuất và đăng ký */
.btn-danger {
  background-color: #e74c3c;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c0392b;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Thêm khoảng cách giữa các nút trong trạng thái đã đăng nhập */
.button-logout {
  margin-left: 10px;
  /* Khoảng cách riêng của nút "Đăng xuất" */
}

/* Dòng liên hệ hỗ trợ */
.container {
  background-color: #34495e;
  /* Nền phụ */
  color: #ecf0f1;
  /* Chữ sáng */
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container .text-danger {
  color: #e74c3c;
  /* Màu đỏ nổi bật */
  font-weight: bold;
  font-size: 14px;
}

.container div {
  font-size: 14px;
}
</style>
