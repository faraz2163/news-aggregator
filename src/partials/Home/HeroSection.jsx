import Container from "../Container";
import SelectBox from "../../components/selectbox/SelectBox";
import {
  CategoryFieldName,
  CountryFieldName,
  SourceFieldName,
  categories,
  countries,
} from "../../constants";
import { fetchSources, selectSources } from "../../slices/sourcesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectUserPreferences,
  updateCategories,
  updateCountries,
  updateSources,
} from "../../slices/userPreferencesSlice";
import { fetchNewsFeed } from "../../slices/newsFeedSlice";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { sources, loading: isSourcesLoading } = useSelector(selectSources);
  const { user_sources, user_categories, user_countries } = useSelector(
    selectUserPreferences
  );

  useEffect(() => {
    if (sources === null) {
      dispatch(fetchSources());
    }
  }, [dispatch]);

  const handleCustomizeClick = (e) => {
    dispatch(fetchNewsFeed());
  };

  return (
    <Container className="text-center flex-col gap-10 relative z-40">
      <h1 className="text-3xl capitalize font-bold mt-0 mx-10 text-zinc-800 md:text-7xl md:mt-20 md:mx-0">
        Build your own newsfeed
      </h1>
      <p className="w-full md:w-1/2 mx-auto font-semibold">
        Follow your favorite sources, categories, and authors, and discover
        inspiring content from across the web. Filter out the noise and make the
        most of your time online.
      </p>
      <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-3 md:w-1/2 mx-auto">
        {/* This is selectbox is loaded from api so it has loading prop */}
        <SelectBox
          className="flex-1 z-30"
          selectionFor={SourceFieldName}
          data={sources}
          loading={isSourcesLoading}
          selected={user_sources}
          dispatchFunction={updateSources}
        />
        <SelectBox
          className="flex-1 z-20"
          selectionFor={CategoryFieldName}
          data={categories}
          selected={user_categories}
          dispatchFunction={updateCategories}
        />
        <SelectBox
          className="flex-1 z-10"
          selectionFor={CountryFieldName}
          data={countries}
          selected={user_countries}
          dispatchFunction={updateCountries}
        />
      </div>
      <div className="flex w-1/2 justify-center items-center mx-auto">
        <button
          onClick={handleCustomizeClick}
          className="bg-blue-600 bg-opacity-45 text-white rounded-full p-7 py-2 hover:px-9 transition-all ease-in-out "
        >
          Customize
        </button>
      </div>
    </Container>
  );
};

export default HeroSection;
