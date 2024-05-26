import { useNavigate } from "@solidjs/router";
import { AuthContext } from "../contexts/AuthContext";
import { onMount, useContext } from "solid-js";

function DashboardLayout(props) {
  const { authenticated, checkSessionState } = useContext(AuthContext);
  const navigate = useNavigate();

  onMount(() => {
    checkSessionState().then(() => {
      if (authenticated() === false) {
        navigate("/login", { replace: false });
      }
    });
  });

  return (
    <>
      <div class="container mx-auto max-w-2xl">{props.children}</div>
    </>
  );
}

export default DashboardLayout;
