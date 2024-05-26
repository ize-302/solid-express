import { useField } from "solid-js-form";
import { For, Show } from "solid-js";

const Select = (props) => {
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
      <select
        name={props.name}
        value={field.value()}
        disabled={props.disabled}
        class="border p-2 rounded-md focus:outline-orange-600"
        use:formHandler
      >
        <option value="">--Please choose an option--</option>
        <For each={props.options}>
          {(item, index) => <option value={item}>{item}</option>}
        </For>
      </select>
      <span class="text-sm text-red-500">{field.error()}</span>
    </div>
  );
};

export default Select;
