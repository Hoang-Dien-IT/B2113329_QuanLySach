<template>
  <nav class="navbar navbar-expand">
    <div class="navbar-brand-container">
      <a href="/admin/books" class="navbar-brand">
        <img src="/client/BookLoaner.png" alt="" />
      </a>
      <div class="mr-auto navbar-nav">
        <li class="nav-item" style="width: 150px">
          <router-link :to="{ name: 'book' }" class="nav-link" :class="{ 'active-link': $route.name === 'book' }">

            <h6><b>Quản lý sách</b></h6>
            <i class="fa-solid fa-book"></i>
          </router-link>
        </li>
        <li class="nav-item" style="width: 200px">
          <router-link :to="{ name: 'book.borrow' }" class="nav-link"
            :class="{ 'active-link': $route.name === 'book.borrow' }">
            <h6><b>Quản lý đơn mượn</b></h6>
            <i class="fa-solid fa-basket-shopping"></i>
          </router-link>
        </li>
      </div>
    </div>
    <div class="logout-container">
      <button class="btn btn-primary">
        <router-link :to="{ name: 'employee.infor' }" class="nav-link m-0">
          Thông tin cá nhân
        </router-link>
      </button>
      <button class="btn btn-danger button-logout" @click="logout">
        Đăng Xuất
      </button>
    </div>
  </nav>
</template>

<script>
import Authorization from "@/services/admin/authorization.service.js";
export default {
  computed: {},
  name: "app-header-admin",
  methods: {
    async logout() {
      // Xử lý đăng xuất ở đây
      try {
        const respone = await Authorization.logOut();
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #34495e;
  /* Màu nền tối hơn để chữ nổi bật */
  height: 80px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  /* Bóng mờ rõ hơn */
  padding: 0 20px;
}

.navbar-brand-container {
  display: flex;
  align-items: center;
}

.navbar-brand {
  margin-right: 30px;
  margin-left: 10%;
}

.navbar-brand img {
  max-height: 50px;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-item {
  text-align: center;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ecf0f1;
  /* Màu chữ trắng nhạt */
  font-size: 15px;
  /* Kích thước chữ lớn hơn */
  font-weight: bold;
  transition: color 0.3s, transform 0.2s;
}

.nav-link:hover {
  color: #1abc9c;
  /* Màu xanh nổi bật khi hover */
  transform: scale(1.1);
}

.fa-book,
.fa-basket-shopping {
  margin-top: 5px;
  font-size: 20px;
  /* Biểu tượng lớn hơn một chút */
}

.logout-container {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 15px;
}

.button-logout {
  padding: 8px 16px;
  font-weight: bold;
}

.btn-primary {
  background-color: #1abc9c;
  color: #fff;
  /* Chữ trắng nổi bật */
  border: none;
  transition: background-color 0.3s, box-shadow 0.2s;
}

.btn-primary:hover {
  background-color: #16a085;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.btn-danger {
  background-color: #e74c3c;
  color: #fff;
  /* Chữ trắng nổi bật */
  border: none;
  transition: background-color 0.3s, box-shadow 0.2s;
}

.btn-danger:hover {
  background-color: #c0392b;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.nav-link.active-link {
  text-decoration: underline;
  color: #1abc9c;
  /* Màu xanh để nhấn mạnh */
}
</style>