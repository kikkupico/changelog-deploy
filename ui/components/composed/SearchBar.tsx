import * as React from "react";
import { Button, Icon } from "../design";

type Props = {
  id: string;
  search?: string;
  placeholder?: string;
  onSearchChange?: (s: string) => void;
  onSearch?: (s: string) => void;
};

export const SearchBar: React.FC<Props> = ({
  id,
  search = "",
  onSearchChange,
  onSearch,
  placeholder = "",
}) => {
  const [hasFocus, setHasFocus] = React.useState(false);
  return (
    <div
      id={id}
      data-testid={id}
      className={`
            w-full
            flex flex-row items-center h-12 rounded
            px-2
            ${
              hasFocus
                ? "border-2 border-brandBlue-400 ring-brandBlue-400"
                : "border border-gray-400 hover:border-gray-500"
            }
            hover:shadow 
            
        `}
    >
      <div className="flex w-5/6">
        <div className="mr-2 flex items-center">
          <Icon id={`${id}-search-icon`} kind="search" />
        </div>
        <input
          id={`${id}-text-input`}
          data-testid={`${id}-text-input`}
          placeholder={placeholder}
          value={search}
          className="border-none outline-none w-full"
          onFocus={() => {
            setHasFocus(true);
          }}
          onBlur={() => {
            setHasFocus(false);
          }}
          onChange={(e) => {
            if (onSearchChange) {
              onSearchChange(e.target.value);
            }
          }}
        />
      </div>
      <div className="flex flex-row items-center justify-end w-1/6">
        <Button
          id={`${id}-search-button`}
          kind="primary"
          size="sm"
          onClick={() => {
            if (onSearch) {
              onSearch(search || "");
            }
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
