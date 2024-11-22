<template>
  <div class="darken-layer">
    <div class="form-wrap">
      <div class="login-wrap">
        <div class="login-wrap__left"></div>
        <div class="login-wrap__right">
          <strong class="login-wrap__right--title">ĐĂNG KÍ</strong>
          <span class="login-wrap__right--welcome-text">
            Chào mừng đến với hệ thống quản lý Admin
          </span>
          <p class="login-wrap__right--warning">
            Vui lòng liên hệ Admin hoặc sử dụng tài khoản khác, tài khoản khách
            không được phép tạo mới!
          </p>
          <div class="divider">
            <span class="line"></span>
            <span class="or-text">hoặc</span>
            <span class="line"></span>
          </div>
          <div class="redirect-container">
            <span>Bạn đã có tài khoản?</span>
            <router-link :to="`/admin/auth/login`" class="redirect-page">
              Đăng nhập
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap");

$primary-color: #007bff;
$secondary-color: #666;
$background-fade: rgba(0, 0, 0, 0.5);

body {
  font-family: "Poppins", sans-serif;
}

.darken-layer {
  width: 100vw;
  height: 100vh;
  background-color: $background-fade;
  position: absolute;
  top: 0;
  left: 0;
}

.form-wrap {
  background-image: url("/admin/background_register.png");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login-wrap {
    display: flex;
    width: 70%;
    height: 80%;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);

    &__left {
      background-image: url("/admin/background_register1.jpg");
      background-size: cover;
      background-position: center;
      width: 50%;
    }

    &__right {
      background: #fff;
      padding: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      &--title {
        font-size: 2.5rem;
        font-weight: 600;
        color: $primary-color;
        margin-bottom: 1.5rem;
      }

      &--welcome-text {
        color: $secondary-color;
        font-size: 1.4rem;
        margin-bottom: 2rem;
      }

      &--warning {
        color: #ff4444;
        font-size: 1.2rem;
        margin-bottom: 2rem;
        line-height: 1.6;
      }
    }

    .divider {
      display: flex;
      align-items: center;
      margin: 2rem 0;

      .line {
        height: 2px;
        background-color: #ddd;
        width: 6rem;
      }

      .or-text {
        margin: 0 1rem;
        font-size: 1.2rem;
        color: $secondary-color;
      }
    }

    .redirect-container {
      font-size: 1.2rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;

      .redirect-page {
        color: $primary-color;
        font-weight: 600;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
