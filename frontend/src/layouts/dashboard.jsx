import { A, useLocation, useNavigate } from "@solidjs/router";
import { AuthContext } from "../contexts/AuthContext";
import { For, onMount, useContext } from "solid-js";
import logo from "../assets/logo.svg";
import { Bell, Search, Chat, Group } from "../components/icons/MenuIcons";
import PrivateChats from "../components/Conversations";
import SearchSection from "../components/SearchSection";
import { ChatFilled } from "../components/icons/Icons";

function DashboardLayout(props) {
  const { authenticated, checkSessionState, user, fetchChannels } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  onMount(() => {
    checkSessionState().then(() => {
      if (authenticated() === false) {
        navigate("/login", { replace: false });
      }
    });
    fetchChannels();
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
    {
      name: "search",
      icon: <Search />,
      path: "/search",
    },
    // {
    //   name: "notification",
    //   icon: <Bell />,
    //   path: "/notifications",
    // },
  ];

  return (
    <div class="bg-green-50">
      <div class="p-5 flex flex-col container mx-auto h-screen">
        <div class="flex gap-2 items-center text-xl justify-between">
          <img src={logo} alt="logo" />
        </div>

        <div class="mt-4 overflow-hidden rounded-lg border border-black bg-background shadow h-full bg-white flex">
          <div class="border-r border-black flex flex-col items-center justify-between px-3 pt-5">
            <div>
              <For each={menus}>
                {(menu, i) => (
                  <A
                    href={menu.path}
                    class="text-3xl hover:bg-green-50 block p-2 rounded-full mb-4 text-primary"
                    classList={{
                      "bg-green-100": location.pathname === menu.path,
                    }}
                  >
                    {menu.icon}
                  </A>
                )}
              </For>
            </div>
            <A
              href={`/profile`}
              class="text-2xl hover:bg-green-200 inline-block p-1 rounded-full mb-3 text-gray-800"
            >
              {user() ? (
                <img
                  class="min-w-8 min-h-8 rounded-full"
                  src={user().avatar_url}
                />
              ) : null}
            </A>
          </div>
          <div class="min-w-[400px] max-w-[400px] border-r border-black overflow-y-auto">
            {location.pathname === "/" && <PrivateChats />}
            {location.pathname === "/search" && <SearchSection />}
          </div>
          <div class="bg-slate-100 w-full overflow-y-auto">
            {props.children}
          </div>
        </div>
        <div class="text-right mt-3 text-slate-500 text-xs">
          Built with 💚 by ize-302
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
