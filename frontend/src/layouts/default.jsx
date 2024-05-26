import { MetaProvider, Title } from "@solidjs/meta";
import { Toaster } from "solid-sonner";

function DefaultLayout(props) {
  return (
    <>
      <Toaster richColors position="bottom-center" />
      <MetaProvider>
        <Title>Chatty</Title>
      </MetaProvider>
      {props.children}
    </>
  );
}

export default DefaultLayout;
