import { Form } from "solid-js-form";
import * as Yup from "yup";
import TextInput from "../../components/shared/TextInput";
import { createSignal } from "solid-js";
import Button from "../../components/shared/Button";
import { A, useNavigate } from "@solidjs/router";
import { toast } from "solid-sonner";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const navigate = useNavigate();

  return (
    <div class="">
      <p class="text-gray-400">Create a Chatty account</p>
      <Form
        initialValues={{ username: "", password: "" }}
        validation={{
          username: Yup.string().required(),
          password: Yup.string().required(),
        }}
        onSubmit={async (form) => {
          setIsSubmitting(true);
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/register`,
            {
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
            toast.success(responseJson.message);
            navigate("/login", { replace: false });
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
            Create account
          </Button>
        </div>
      </Form>

      <div class="flex justify-center gap-1 mt-4 text-gray-600 text-sm">
        Already have an account?{" "}
        <A class="text-primary" href="/login">
          Log in
        </A>
      </div>
    </div>
  );
};

export default Signup;
