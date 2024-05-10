import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import DetailedSearch from "./Search/DetailedSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserPreferences,
  updateSearchWord,
} from "../slices/userPreferencesSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user_search } = useSelector(selectUserPreferences);
  const handleSearchKeyPress = (e) => {
    dispatch(updateSearchWord(e.target.value));
  };
  return (
    <header>
      <nav
        className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 mb-7 lg:mb-0">
          <a href="/" className="-m-1.5 p-1.5">
            <h2 className="text-3xl font-bold">
              <span className="text-blue-600">DAILY </span>NEWS
            </h2>
          </a>
        </div>
        <div
          className={`lg:flex lg:gap-x-12 w-full lg:w-1/3 relative transition-all ease-in-out ${
            user_search !== "" ? "md:mt-52" : ""
          }`}
        >
          <input
            type="text"
            className={`rounded-3xl block w-full border-0 py-2 px-5 pr-10 bg-my-custom-bg bg-opacity-70 backdrop-blur-md outline-none text-sm text-gray-600 shadow-sm placeholder:text-gray-400 placeholder:font-semibold sm:text-sm sm:leading-6`}
            placeholder="Search by Keywords"
            value={user_search}
            defaultValue={undefined}
            onChange={handleSearchKeyPress}
          />
          <MagnifyingGlassIcon
            width={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 fill-gray-400"
          />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <div className={user_search ? `block` : `hidden`}>
        <DetailedSearch />
      </div>
    </header>
  );
};

export default Header;
