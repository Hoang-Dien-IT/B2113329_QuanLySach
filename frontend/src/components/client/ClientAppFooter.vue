<template>
  <div>
    <footer class="footer">
      <hr />
      <div class="footer__container">
        <!-- Phần trái -->
        <div class="footer__left">
          <img src="/client/BookLoaner.png" alt="BookLoaner Logo" class="footer__logo" />
          <p class="footer__title">Hệ Thống Nhà Sách BookLoaner</p>
          <p class="footer__address">
            Trụ sở chính: 96 Trần Vĩnh Kiết, Phường An Bình, Quận Ninh Kiều, TP.Cần Thơ
          </p>
          <p class="footer__contact">
            Điện thoại: <a href="tel:0944779743" class="footer__link">0944779743</a> <br />
            Email: <a href="mailto:BookLoaner@gmail.com" class="footer__link">BookLoaner@gmail.com</a>
          </p>
        </div>

        <!-- Phần phải -->
        <div class="footer__right">
          <ul class="footer__list">
            <li class="footer__item">
              <a href="https://www.facebook.com/" class="footer__link">
                <img src="/client/facebook.png" alt="Facebook" class="footer__icon" />
              </a>
            </li>
            <li class="footer__item">
              <a href="https://www.tiktok.com/" class="footer__link">
                <img src="/client/tik-tok.png" alt="TikTok" class="footer__icon" />
              </a>
            </li>
            <li class="footer__item">
              <a href="https://www.instagram.com/" class="footer__link">
                <img src="/client/instagram.png" alt="Instagram" class="footer__icon" />
              </a>
            </li>
            <li class="footer__item">
              <a href="https://www.telegram.com/" class="footer__link">
                <img src="/client/telegram.png" alt="Telegram" class="footer__icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  background-color: #2c3e50;
  /* Màu xám đậm */
  color: #ecf0f1;
  /* Màu trắng sáng */
  padding: 40px 20px;
  text-align: center;
  border-top: 2px solid #34495e;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
}

.footer__container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.footer__left,
.footer__right {
  flex: 1;
  margin: 20px;
}

.footer__logo {
  max-width: 150px;
  margin-bottom: 15px;
}

.footer__title {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #f39c12;
  /* Màu vàng nổi bật */
}

.footer__address,
.footer__contact {
  margin-bottom: 10px;
  font-size: 1em;
  color: #bdc3c7;
}

.footer__link {
  color: #1abc9c;
  /* Màu xanh ngọc */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.footer__link:hover {
  color: #16a085;
  /* Màu đậm hơn khi hover */
}

.footer__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
}

.footer__item {
  display: inline-block;
}

.footer__icon {
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.footer__icon:hover {
  transform: scale(1.2);
  opacity: 0.8;
}
</style>
