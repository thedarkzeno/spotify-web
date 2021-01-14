import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Input, Button } from "./styles";
import SearchIcon from "../../Assets/loupe.svg";
import api from "../../Services/api";
import { getToken, logout } from "../../Services/auth";
import { SetResults, SetRefresh } from "../../Store/actions";

const Search = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const doSearch = () => {
    if (query !== "" && query !== null) {
      api
        .get(
          `search?q=${encodeURI(
            query
          )}&type=album,artist,track&offset=0&limit=10`,
          {
            headers: {
              Authorization: "Bearer " + getToken() || "",
            },
          }
        )
        .then((res) => {
          dispatch(SetResults(res.data));
        })
        .catch((error) => {
          //error may be caused by expiration of token, so we logout
          logout();
          dispatch(SetRefresh(true));
          history.push("/");
        });
    }
  };
  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doSearch();
        }}
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Procure aqui..."
        />
        <Button type="submit">
          <img src={SearchIcon} width={15} alt="" />
        </Button>
      </form>
    </Container>
  );
};

export default Search;
