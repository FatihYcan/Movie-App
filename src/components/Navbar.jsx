import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Switch from "./Switch";
import avatar from "../assets/icons/avatar.png";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { logOut, currentUser } = useAuthContext();

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-neutral-100 dark:bg-[#032541] dark:text-white fixed w-full z-20 top-0"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <NavDropdown.Item
                  className="md:text-2xl font-semibold cursor-pointer"
                  href="/"
                >
                  Movie App
                </NavDropdown.Item>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavDropdown
                    title="Movies"
                    id="collapsible-nav-dropdown"
                    className="mr-2"
                  >
                    <NavDropdown.Item href="/movie/now-playing">
                      Now Playing
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/movie">Popular</NavDropdown.Item>
                    <NavDropdown.Item href="/movie/top-rated">
                      Top Rated
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/movie/upcoming">
                      Upcoming
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/movie/trending">
                      Trending
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Tv Shows" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="/tv/airing-today">
                      Airing Today
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/tv/on-the-air">
                      On The Air
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/tv">Popular</NavDropdown.Item>
                    <NavDropdown.Item href="/tv/top-rated">
                      Top Rated
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/tv/trending">
                      Trending
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {currentUser && (
                  <h5 className="mr-2 capitalize">
                    {currentUser?.displayName}
                  </h5>
                )}
                <Switch />

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt="user"
                        src={currentUser?.photoURL || avatar}
                        className="h-8 w-8 rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      {!currentUser && (
                        <>
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                to="/register"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Register
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login
                              </Link>
                            )}
                          </MenuItem>
                        </>
                      )}
                      {currentUser && (
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={logOut}
                            >
                              Logout
                            </Link>
                          )}
                        </MenuItem>
                      )}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2 sm:px-3">
            <NavDropdown
              title="Movies"
              id="collapsible-nav-dropdown"
              className="mb-3"
            >
              <NavDropdown.Item href="/movie/now-playing">
                Now Playing
              </NavDropdown.Item>
              <NavDropdown.Item href="/movie">Popular</NavDropdown.Item>
              <NavDropdown.Item href="/movie/top-rated">
                Top Rated
              </NavDropdown.Item>
              <NavDropdown.Item href="/movie/upcoming">
                Upcoming
              </NavDropdown.Item>
              <NavDropdown.Item href="/movie/trending">
                Trending
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Tv Shows" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/tv/airing-today">
                Airing Today
              </NavDropdown.Item>
              <NavDropdown.Item href="/tv/on-the-air">
                On The Air
              </NavDropdown.Item>
              <NavDropdown.Item href="/tv">Popular</NavDropdown.Item>
              <NavDropdown.Item href="/tv/top-rated">
                Top Rated
              </NavDropdown.Item>
              <NavDropdown.Item href="/tv/trending">Trending</NavDropdown.Item>
            </NavDropdown>
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-3">
              <div className="flex-shrink-0">
                <img
                  alt="user"
                  src={currentUser?.photoURL || avatar}
                  className="h-8 w-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none">
                  {currentUser && (
                    <h5 className="mr-2 capitalize">
                      {currentUser?.displayName}
                    </h5>
                  )}
                </div>
              </div>

              <div className="relative ml-auto">
                <Switch />
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <DisclosureButton className="block rounded-md px-3 py-2 text-base font-medium focus:outline-none">
                {currentUser ? (
                  <Link
                    className="block text-sm dark:text-white"
                    onClick={logOut}
                  >
                    Logout
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="block mb-3 text-sm dark:text-white"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="block ml-[-18px] text-sm dark:text-white"
                    >
                      Login
                    </Link>
                  </>
                )}
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div className="h-[60px]"></div>
    </>
  );
};

export default Navbar;
