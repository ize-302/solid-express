import { A, useLocation, useNavigate } from "@solidjs/router";
import { AuthContext } from "../contexts/AuthContext";
import { For, onMount, useContext } from "solid-js";
import logo from "../assets/logo.svg";
import { Bell, Search, User, Chat, Group } from "../components/icons/MenuIcons";

function DashboardLayout(props) {
  const { authenticated, checkSessionState } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  onMount(() => {
    checkSessionState().then(() => {
      if (authenticated() === false) {
        navigate("/login", { replace: false });
      }
    });
  });

  const menus = [
    {
      name: "private chats",
      icon: <Chat />,
      path: "/",
    },
    // {
    //   name: "group chat",
    //   icon: <Group />,
    //   path: "/group-chat",
    // },
    // {
    //   name: "search",
    //   icon: <Search />,
    //   path: "/search",
    // },
    // {
    //   name: "notification",
    //   icon: <Bell />,
    //   path: "/notifications",
    // },
  ];

  return (
    <div class="p-5 h-screen flex flex-col bg-green-50">
      <div>
        <img src={logo} alt="logo" />
      </div>

      <div class="mt-4 overflow-hidden rounded-lg border border-black bg-background shadow h-full bg-white flex">
        <div class="border-r border-black flex flex-col items-center justify-between px-3 pt-5">
          <div>
            <For each={menus}>
              {(menu, i) => (
                <A
                  href={menu.path}
                  class="text-2xl hover:bg-green-200 block p-2 rounded-lg mb-3 text-gray-800"
                  classList={{
                    "bg-green-200": location.pathname === menu.path,
                  }}
                >
                  {menu.icon}
                </A>
              )}
            </For>
          </div>
          {/* <A
            href={`/profile`}
            class="text-2xl hover:bg-green-200 inline-block p-2 rounded-lg mb-3 text-gray-800"
          >
            <User />
          </A> */}
        </div>
        <div class="min-w-[400px] max-w-[400px] border-r border-black overflow-y-auto"></div>
        <div class="bg-gray-100 w-full overflow-y-auto">{props.children}</div>
      </div>
      <div class="text-center mt-3 text-slate-500 text-sm">
        Built with 💚 by ize-302
      </div>
    </div>
  );
}

export default DashboardLayout;
