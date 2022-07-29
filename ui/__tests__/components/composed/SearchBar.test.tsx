import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { SearchBar } from "../../../components/composed/SearchBar";
import "@testing-library/jest-dom";

beforeEach(() => {
  cleanup();
});

describe("SearchBar", () => {
  it("renders default state correctly", async () => {
    render(<SearchBar id="searchbar" search="test" />);
    expect(screen.getByTestId("searchbar")).toBeInTheDocument();
    expect(screen.getByTestId("searchbar-search-icon")).toBeInTheDocument();
    expect(screen.getByTestId("searchbar-text-input")).toHaveAttribute(
      "value",
      "test"
    );
    expect(screen.getByTestId("searchbar-text-input")).toHaveAttribute(
      "placeholder",
      ""
    );
    expect(screen.getByTestId("searchbar-search-button")).toBeInTheDocument();
  });

  it("renders props correctly", async () => {
    const onSearch = jest.fn();
    const onSearchChange = jest.fn();
    render(
      <SearchBar
        id="searchbar"
        onSearch={onSearch}
        onSearchChange={onSearchChange}
        placeholder="placeholder"
      />
    );
    expect(screen.getByTestId("searchbar-text-input")).toBeInTheDocument();

    // text input
    const textInput = screen.getByTestId("searchbar-text-input");
    expect(textInput).toHaveAttribute("value", "");
    expect(textInput).toHaveAttribute("placeholder", "placeholder");
    fireEvent.change(textInput, { target: { value: "search" } });
    expect(onSearchChange).toHaveBeenCalledWith("search");

    // on text input being focussed, the whole searchbar should show focus
    fireEvent.focus(textInput);
    expect(screen.getByTestId("searchbar").className).toContain(
      "border-2 border-brandBlue-400 ring-brandBlue-400"
    );

    fireEvent.blur(textInput);
    expect(screen.getByTestId("searchbar").className).not.toContain(
      "border-2 border-brandBlue-400 ring-brandBlue-400"
    );

    const searchButton = screen.getByTestId("searchbar-search-button");
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalledWith("");
  });
});
