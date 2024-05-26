import logo from "../assets/logo.svg";

function AuthLayout(props) {
  return (
    <div class="h-screen flex justify-center items-center bg-[#fff7ed]">
      <div class="max-w-md container border rounded-lg px-8 py-10 bg-white shadow-sm space-y-5">
        <img src={logo} alt="logo" />
        {props.children}
      </div>
    </div>
  );
}

export default AuthLayout;
