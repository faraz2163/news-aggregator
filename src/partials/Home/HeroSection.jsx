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

const HeroSection = () => {
  const dispatch = useDispatch();
  const { sources, loading: isSourcesLoading } = useSelector(selectSources);
  const { user_sources, user_categories, user_countries } = useSelector(
    selectUserPreferences
  );

  useEffect(() => {
    dispatch(fetchSources());
  }, [dispatch]);

  return (
    <Container className="text-center flex-col gap-10">
      <h1 className="text-7xl capitalize font-bold mt-20 text-zinc-800">
        Build your own newsfeed
      </h1>
      <p className="w-1/2 mx-auto font-semibold">
        Follow your favorite sources, categories, and authors, and discover
        inspiring content from across the web. Filter out the noise and make the
        most of your time online.
      </p>
      <div className="flex gap-4 w-1/2 mx-auto">
        {/* This is selectbox is loaded from api so it has loading prop */}
        <SelectBox
          className="flex-1 w-2/6"
          selectionFor={SourceFieldName}
          data={sources}
          loading={isSourcesLoading}
          selected={user_sources}
          dispatchFunction={updateSources}
        />
        <SelectBox
          className="flex-1 w-2/6"
          selectionFor={CategoryFieldName}
          data={categories}
          selected={user_categories}
          dispatchFunction={updateCategories}
        />
        <SelectBox
          className="flex-1 w-2/6"
          selectionFor={CountryFieldName}
          data={countries}
          selected={user_countries}
          dispatchFunction={updateCountries}
        />
      </div>
      <div className="flex w-1/2 justify-center items-center mx-auto">
        <button className="bg-blue-600 bg-opacity-45 text-white rounded-full p-7 py-2 hover:px-9 transition-all ease-in-out ">
          Customize
        </button>
      </div>
    </Container>
  );
};

export default HeroSection;
