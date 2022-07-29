import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { SearchBar } from "../../components/composed/SearchBar";
import { useSearch, getSearchValue } from "../../utils/search";

const UseSearchTestComponent: React.FC = () => {
  const { search, onSearch, onSearchChange } = useSearch("test");
  return (
    <>
      <SearchBar
        id="searchbar"
        search={search}
        onSearch={onSearch}
        onSearchChange={onSearchChange}
      />
      <p data-testid="search-value">{search}</p>
    </>
  );
};

test("useSearch returns correct state and statechangers", () => {
  render(<UseSearchTestComponent />);
  expect(screen.getByTestId("search-value").textContent).toEqual("test");
  fireEvent.change(screen.getByTestId("searchbar-text-input"), {
    target: { value: "changed" },
  });
  expect(screen.getByTestId("search-value").textContent).toEqual("changed");
});

test("getSearchValue returns the right value from URL params", () => {
  expect(getSearchValue({ search: "searchtext" })).toEqual("searchtext");

  expect(
    getSearchValue({
      foo: "bar",
      random: "bar",
      einstein: "newton",
    })
  ).toEqual("");
});
