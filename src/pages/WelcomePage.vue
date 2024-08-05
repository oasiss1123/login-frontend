<template>
  <div class="welcome">
    <h1>Welcome</h1>
    <h1 v-if="data">{{ data }}</h1>
    <p v-else>Please Log in first!.</p>
    <div class="form-group m-3">
      <button @click="logOut()" type="submit" class="btn btn-danger">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.getDataFromLocalStorage();
  },
  methods: {
    getDataFromLocalStorage() {
      const storedData = localStorage.getItem("name");
      if (storedData) {
        this.data = storedData;
      }
    },
    logOut() {
      localStorage.clear();
      window.location.assign("/");
    },
  },
};
</script>

<style scoped>
.welcome {
  color: wheat;
  text-align: center;
  margin-top: "20%";
}
</style>
