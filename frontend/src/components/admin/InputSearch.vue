<template>
    <div class="search-bar">
        <input type="text" class="search-input" placeholder="Nhập thông tin sách cần tìm" :value="modelValue"
            @input="updateModelValue" @keyup.enter="submit" />
        <button class="search-button" type="button" @click="submit">
            <i class="fas fa-search"></i> Tìm kiếm
        </button>
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
.search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-input {
    flex: 1;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    outline: none;
}

.search-input::placeholder {
    color: #aaa;
}

.search-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-button:hover {
    background-color: #0056b3;
}

.search-button i {
    margin-right: 8px;
}
</style>
