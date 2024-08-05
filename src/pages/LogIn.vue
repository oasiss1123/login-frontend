<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <form @submit.prevent="handleSubmit()">
          <div class="form-group m-3">
            <input
              type="text"
              placeholder="Email or phone number"
              class="form-control"
              v-model="emailOrPhone"
            />
            <span class="err">{{ emailError }}</span>
          </div>
          <div class="form-group m-3">
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              v-model="password"
            />
            <span class="err">{{ passwordError }}</span>
          </div>

          <div class="form-group m-3">
            <button type="submit" class="btn btn-danger">Login</button>
          </div>
          <div class="form-group m-3">
            <a href="/singup">Register Now! </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import * as yup from "yup";
import axios from "axios";

export default {
  setup() {
    const emailOrPhone = ref("");
    const password = ref("");

    const emailSchema = yup
      .string()
      .required()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const passwordSchema = yup.string().required().min(4).max(60);

    const emailError = ref("");
    const passwordError = ref("");

    const handleSubmit = async () => {
      try {
        const checkPhone =
          /^([02]*-([0-9]{3})*-([0-9]{4})+$|^([0-9]{3})*-([0-9]{3})*-([0-9]{4}))+$|^(([02]+[0-9]{7})+$|^([0-9]{10}))+$/.test(
            emailOrPhone.value
          )
            ? true
            : false;

        const checkMail = await emailSchema.isValid(emailOrPhone.value);

        passwordError.value = (await passwordSchema.isValid(password.value))
          ? ""
          : "Your password must contaim between 4 and 60 characters.";

        // Submit to backend if no errors
        if (checkPhone || checkMail) {
          axios
            .post("http://localhost:3000/login", {
              emailOrPhone: emailOrPhone.value,
              password: password.value,
            })
            .then((res) => {
              localStorage.setItem("name", res.data.name);
              window.alert("Success!");
              location.assign("/welcome");
            })
            .catch((err) => {
              window.alert("email or password is wrong!");
              console.log(err);
            });
        } else {
          emailError.value = "Please enter a valid email or phone number.";
        }
      } catch (err) {
        console.log(err);
      }
    };

    return { emailOrPhone, password, emailError, passwordError, handleSubmit };
  },
};
</script>

<style scoped>
.err {
  color: rgb(255, 196, 0);
}
</style>
