import api from "../../utils/api";
import { useEffect, useState } from "react";
import { AsyncTypeahead, MenuItem } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";

const SearchBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const filterBy = () => true;

  const [text, setText] = useState("");

  const handleText = (text) => {
    setText(text);
  };

  useEffect(() => {
    const onSearch = async () => {
      setIsLoading(true);
      const response = await api.get(`product/search?search=${text}`);
      setIsLoading(false);
      setOptions(response.data);
    };
    const timeId = setTimeout(() => {
      if (text.length > 1) {
        onSearch();
      }
    }, [1000]);
    return () => clearTimeout(timeId);
  }, [text]);
  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      className="d-flex col-12 col-md-3 order-3 order-md-2 order-xl-3"
      labelKey="title"
      minLength={1}
      onSearch={handleText}
      options={options}
      placeholder="بحث..."
      renderMenuItemChildren={(option) => (
        <Link className="nav-link" to={`/ourstore/${option._id}`}>
          <img
            alt={option.title}
            src={option.images[0]?.secure_url}
            style={{
              height: "24px",
              marginRight: "10px",
              width: "24px",
            }}
          />
          {/* <Link className="nav-link" to={`/ourstore/${option._id}`}> */}
          {option.title.substring(0, 20) + "..."}
          {/* </Link> */}
        </Link>
      )}
    />
  );
};

export default SearchBox;
