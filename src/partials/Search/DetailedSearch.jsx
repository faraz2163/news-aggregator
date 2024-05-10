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
import { useEffect, useState } from "react";
import {
  selectUserPreferences,
  updateSearchCategories,
  updateSearchCountries,
  updateSearchEndDate,
  updateSearchSources,
  updateSearchStartDate,
} from "../../slices/userPreferencesSlice";
import Feed from "../Home/Feed";
import {
  fetchSearchResults,
  selectSearchResults,
} from "../../slices/searchResultsSlice";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import Datepicker from "../../components/datepicker/Datepicker";
import { checkDateRange, isMoreThanMonthAgo } from "../../utils";

const DetailedSearch = () => {
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState([]);
  const { sources, loading: isSourcesLoading } = useSelector(selectSources);
  const {
    user_search_sources,
    user_search_categories,
    user_search_countries,
    user_search_start_date,
    user_search_end_date,
  } = useSelector(selectUserPreferences);
  const { articles, loading } = useSelector(selectSearchResults);

  // useEffect(() => {
  //   if (sources === null) {
  //     dispatch(fetchSources());
  //   }
  // }, [dispatch]);

  const handleSearchClick = (e) => {
    dispatch(fetchSearchResults());
  };

  const messages = {
    oneMonthError:
      "Date shouldn't be within 30 days in past. As the free plan of the API does not allow searching for articles older than one month.",
    rangeError: "Start should be smaller than end date.",
  };
  const handleStartDateChange = (e) => {
    const { value: startDate } = e.target;
    if (isMoreThanMonthAgo(startDate)) {
      if (!validationErrors.includes(messages.oneMonthError)) {
        setValidationErrors((prev) => {
          return [...prev, messages.oneMonthError];
        });
      }
    } else {
      setValidationErrors((prev) => {
        return prev.filter(
          (validationError) => validationError !== messages.oneMonthError
        );
      });
    }

    if (user_search_end_date !== "") {
      if (!checkDateRange(user_search_start_date, user_search_end_date)) {
        // Date are not valid
        if (!validationErrors.includes(messages.rangeError)) {
          setValidationErrors((prev) => {
            return [...prev, messages.rangeError];
          });
        }
        return;
      }
    }
    setValidationErrors((prev) => {
      return prev.filter(
        (validationError) => validationError !== messages.rangeError
      );
    });

    // if (user_search_end_date !== "") {
    //   if () {
    //   setValidationErrors((prev) => {
    //     return [...prev, messages.rangeError];
    //   });
    //   }
    // }

    //         !checkDateRange(user_search_start_date, user_search_end_date) &&
    // !validationErrors.includes(messages.rangeError)

    dispatch(updateSearchStartDate(e.target.value));
  };

  const handleStartEndChange = (e) => {
    dispatch(updateSearchEndDate(e.target.value));
  };

  return (
    <>
      <Container className="text-center flex-col gap-10 relative z-40">
        <ul className="bg-white bg-opacity-45 border-l-4 border-l-red-500 rounded-lg w-full md:w-1/2 mx-auto text-left">
          {validationErrors.map((err) => (
            <li className="p-2 list-[decimal-leading-zero] list-inside">
              {err}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2 md:w-1/2 mx-auto">
          <Datepicker label="Start Date:" onChange={handleStartDateChange} />
          <Datepicker label="End Date:" onChange={handleStartEndChange} />
        </div>
        <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-3 md:w-1/2 mx-auto">
          {/* This is selectbox is loaded from api so it has loading prop */}
          <SelectBox
            className="flex-1 z-30"
            selectionFor={SourceFieldName}
            data={sources}
            loading={isSourcesLoading}
            selected={user_search_sources}
            dispatchFunction={updateSearchSources}
          />
          <SelectBox
            className="flex-1 z-20"
            selectionFor={CategoryFieldName}
            data={categories}
            selected={user_search_categories}
            dispatchFunction={updateSearchCategories}
          />
          <SelectBox
            className="flex-1 z-10"
            selectionFor={CountryFieldName}
            data={countries}
            selected={user_search_countries}
            dispatchFunction={updateSearchCountries}
          />
        </div>
        <div className="flex w-1/2 justify-center items-center mx-auto">
          <button
            onClick={handleSearchClick}
            className="bg-blue-600 bg-opacity-45 text-white rounded-full p-7 py-2 hover:px-9 transition-all ease-in-out "
          >
            Search
          </button>
        </div>
      </Container>
      <Feed articles={articles} loading={loading} />
    </>
  );
};

export default DetailedSearch;
