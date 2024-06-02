import { Form } from "solid-js-form";
import * as Yup from "yup";
import TextInput from "../../components/shared/TextInput";
import { createSignal } from "solid-js";
import Button from "../../components/shared/Button";
import { A, useNavigate } from "@solidjs/router";
import { toast } from "solid-sonner";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const navigate = useNavigate();

  return (
    <div>
      <p class="text-gray-400">Log in to Chatty</p>
      <Form
        id="login-form"
        initialValues={{ username: "", password: "" }}
        validation={{
          username: Yup.string().required(),
          password: Yup.string().required(),
        }}
        onSubmit={async (form) => {
          setIsSubmitting(true);
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/login`,
            {
              credentials: "include",
              method: "post",
              headers: {
                "Content-Type": "application/json",
                accept: "*/*",
              },
              body: JSON.stringify({
                username: form.values.username,
                password: form.values.password,
              }),
            }
          );
          const responseJson = await response.json();
          if (!responseJson.success) {
            toast.error(responseJson.message);
          } else {
            navigate("/", { replace: false });
          }
          setIsSubmitting(false);
          return;
        }}
        class="space-y-4 mt-5"
      >
        <TextInput
          name="username"
          label="Username"
          type={"text"}
          disabled={isSubmitting()}
        />
        <TextInput
          name="password"
          label="Password"
          type={"password"}
          disabled={isSubmitting()}
        />
        <div>
          <Button
            isLoading={isSubmitting()}
            disabled={isSubmitting()}
            type="submit"
          >
            Log in
          </Button>
        </div>
      </Form>

      <div class="flex justify-center gap-1 mt-4 text-gray-600 text-sm">
        Don't have an account?{" "}
        <A class="text-primary" href="/signup">
          Sign up
        </A>
      </div>
    </div>
  );
};

export default Login;
