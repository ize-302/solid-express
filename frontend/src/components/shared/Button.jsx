import Spinner from "../icons/Spinner";

const Button = (props) => {
  return (
    <button
      class="bg-primary h-10 text-white rounded-md px-5 w-full mt-5 disabled:cursor-not-allowed disabled:opacity-50 font-medium"
      type={props.type}
      {...props}
    >
      {props.isLoading ? (
        <div class="flex justify-center">
          <Spinner />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
