<template>
    <div class="input-group">
        <input
            type="text"
            class="form-control"
            placeholder="Nhập thông tin sách cần tìm"
            :value="modelValue"
            @input="updateModelValue"
            @keyup.enter="submit"
        />  
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submit">
                    <i class="fas fa-search"></i> Tìm kiếm
            </button>
        </div>
    </div>
</template>


<script>
export default {
    props: {
    modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>

<style scoped>
.input-group {
    display: flex;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
    /* Căn giữa */
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Tạo hiệu ứng đổ bóng */
}

.form-control {
    flex: 1;
    /* Chiếm toàn bộ không gian còn lại */
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    outline: none;
}

.form-control::placeholder {
    color: #aaa;
    /* Màu placeholder */
    font-style: italic;
}

.input-group-append {
    display: flex;
}

.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn i {
    margin-right: 5px;
}

.btn:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    /* Nâng nút nhẹ khi hover */
}

.btn:active {
    transform: translateY(0);
    /* Hiệu ứng khi nhấn */
}

.btn:focus {
    outline: none;
}

@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
        /* Điều chỉnh bố cục trên màn hình nhỏ */
        border-radius: 8px;
    }

    .form-control {
        width: 100%;
        border-bottom: 1px solid #ddd;
    }

    .btn {
        width: 100%;
        /* Nút chiếm toàn bộ chiều rộng */
        border-radius: 0;
    }
}
</style>

