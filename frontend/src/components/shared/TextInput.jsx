import { useField } from "solid-js-form";
import { Show } from "solid-js";

const TextInput = (props) => {
  const { field, form } = useField(props.name);
  const formHandler = form.formHandler;

  return (
    <div class="flex flex-col">
      <Show when={props.label}>
        <label for={props.name} class="text-gray-500 mb-1 test-sm font-regular">
          {props.label}
          {/* {field.required() ? " *" : ""} */}
        </label>
      </Show>
      <input
        class="border h-10 px-2 rounded-md focus:outline-orange-600"
        name={props.name}
        value={field.value()}
        type={props.type}
        disabled={props.disabled}
        //@ts-ignore
        use:formHandler //still need to properly type the handler
      />
      <span class="text-sm text-red-500">{field.error()}</span>
    </div>
  );
};

export default TextInput;
