import Container from "../Container";
import SelectBox from "../../components/selectbox/SelectBox";
import {
  CategoryFieldName,
  CountryFieldName,
  SourceFieldName,
  categories,
  countries,
} from "../../constants";
import { selectSources } from "../../slices/sourcesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
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
import Datepicker from "../../components/datepicker/Datepicker";
import {
  isDateGreaterThanToday,
  isEndDateValid,
  isStartDateValid,
} from "../../utils";

const DetailedSearch = () => {
  const dispatch = useDispatch();
  const errorBox = useRef();
  const [validationErrors, setValidationErrors] = useState([]);
  const { sources, loading: isSourcesLoading } = useSelector(selectSources);
  const {
    user_search_sources,
    user_search_categories,
    user_search_countries,
    user_search_start_date: startDate,
    user_search_end_date: endDate,
  } = useSelector(selectUserPreferences);
  const { articles, loading } = useSelector(selectSearchResults);

  const handleSearchClick = (e) => {
    if (validationErrors.length) {
      errorBox.current.classList.add("bg-opacity-100", "scale-105");
      setTimeout(() => {
        errorBox.current.classList.remove("bg-opacity-100", "scale-105");
      }, 2000);
    } else {
      dispatch(fetchSearchResults());
    }
  };

  const messages = {
    oneMonthError:
      "Start date should not be smaller than one month back from current date. As the free plan of the API does not allow searching for articles older than one month.",
    rangeError: "End date should not be smaller than start date.",
    higherTodayEnd: "End date should not be higher than today date.",
    higherTodayStart: "Start date should not be higher than today date.",
  };

  const handleValidation = () => {
    const newErrors = [];

    if (startDate === "" || endDate === "") {
      setValidationErrors(newErrors);
      return;
    }

    if (!isDateGreaterThanToday(startDate)) {
      newErrors.push(messages.higherTodayStart);
    }

    if (!isDateGreaterThanToday(endDate)) {
      newErrors.push(messages.higherTodayEnd);
    }

    if (!isEndDateValid(startDate, endDate)) {
      newErrors.push(messages.rangeError);
    }

    if (!isStartDateValid(startDate)) {
      newErrors.push(messages.oneMonthError);
    }

    setValidationErrors(newErrors);
  };

  useEffect(() => {
    handleValidation();
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    dispatch(updateSearchStartDate(e.target.value));
  };

  const handleStartEndChange = (e) => {
    dispatch(updateSearchEndDate(e.target.value));
  };

  return (
    <>
      <Container className="text-center flex-col gap-10 relative z-40">
        <ul
          ref={errorBox}
          className="bg-white bg-opacity-45 border-l-4 transition-all border-l-red-500 rounded-lg w-full md:w-1/2 mx-auto text-left"
        >
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
