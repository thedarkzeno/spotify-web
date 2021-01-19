import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container, Input, Select } from "./styles";
import api from "../../Services/api";
import { getToken, logout } from "../../Services/auth";
import { SetResults, SetRefresh, SetQuery } from "../../Store/actions";

const Search = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState({});
  const [applyFilters, setApplyFilters] = useState({});
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    setMounted(true);
    api
      .get("/", {
        baseURL: "http://www.mocky.io/v2/5a25fade2e0000213aa90776",
      })
      .then((res) => {
        // console.log(res.data);
        for (let i = 0; i < 5; i++) {
          setApplyFilters((prevState) => ({
            ...prevState,
            [res.data.filters[i].id]: "",
          }));
          setCurrentFilters((prevState) => ({
            ...prevState,
            [res.data.filters[i].id]: "",
          }));
        }

        setFilters(res.data);
      });
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    var searchString = "?";
    for (const [key, value] of Object.entries(currentFilters)) {
      if (value !== "") {
        if (key === "country" && value === "en_US") {
          searchString += `${key}=US&`;
        } else {
          searchString += `${key}=${value}&`;
        }
      }
    }

    api
      .get(`browse/featured-playlists${searchString}`, {
        headers: {
          Authorization: "Bearer " + getToken() || "",
        },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(SetResults(res.data));
      })
      .catch(() => {
        //error may be caused by expiration of token, so we logout
        logout();
        dispatch(SetRefresh(true));
        history.push("/");
      });
  }, [count, dispatch, history, mounted, currentFilters]);

  useEffect(() => {
    const interval = setInterval(updateCount, 30000);
    return () => clearInterval(interval);
  }, []);
  const updateCount = () => {
    setCount((c) => c + 1);
  };

  const handleSearch = () => {
    setCurrentFilters(applyFilters);
    dispatch(SetQuery(query));
  };
  return (
    <Container>
      <Input
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filters.filters !== undefined &&
        filters.filters.map((filter, index) => (
          <div style={{ margin: 10 }} key={index}>
            {filter.values !== undefined && (
              <Select
                value={applyFilters[filter.id]}
                onChange={(e) => {
                  setApplyFilters((prevState) => ({
                    ...prevState,
                    [filter.id]: e.target.value,
                  }));
                }}
              >
                <option value={""}>{`Select ${filter.id}`}</option>
                {filter.values.map((value, i) => (
                  <option key={value.value} value={value.value}>
                    {value.name}
                  </option>
                ))}
              </Select>
            )}
            {filter.validation !== undefined && (
              <Input
                placeholder={filter.name}
                type={
                  filter.validation.primitiveType === "INTEGER"
                    ? "number"
                    : "string"
                }
                min={filter.validation.min ? filter.validation.min : 0}
                max={
                  filter.validation.max
                    ? filter.validation.max
                    : Number.MAX_SAFE_INTEGER
                }
                value={applyFilters[filter.id]}
                onChange={(e) => {
                  setApplyFilters((prevState) => ({
                    ...prevState,
                    [filter.id]: e.target.value,
                  }));
                }}
              />
            )}
          </div>
        ))}
      <Button onClick={handleSearch}>Search</Button>
    </Container>
  );
};

export default Search;
