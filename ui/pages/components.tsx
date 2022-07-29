import type { NextPage } from "next";
import { Label, Button, Icon, IconButton } from "../components/design";
import { SearchBar } from "../components/composed/SearchBar";

const Components: NextPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="mb-2 text-xl font-bold">UI Components</h1>
      <div id="label" className="mb-2">
        <h2 className="text-lg font-semibold mb-1">Label</h2>
        <div className="flex flex-row w-auto items-center">
          <div className="mr-1">
            <Label id="active" kind="active" text="Active Label" />
          </div>
          <div className="mr-1">
            <Label id="default" kind="default" text="Default Label" />
          </div>
        </div>
      </div>
      <div id="icon" className="mb-2">
        <h2 className="text-lg font-semibold mb-1">Icon</h2>
        <div className="flex flex-row w-auto items-center">
          <div id="search-icon" className="mr-1">
            <Icon id="search" kind="search" />
          </div>
          <div id="filter-icon" className="mr-1">
            <Icon id="filter" kind="filter" />
          </div>
        </div>
      </div>
      <div id="icon-button" className="mb-2">
        <h2 className="text-lg font-semibold mb-1">IconButton</h2>
        <div className="flex flex-row w-auto items-center">
          <div id="search-icon-button" className="mr-1">
            <IconButton
              id="filter-active-icon-button"
              kind="active"
              iconKind="filter"
              onClick={() => window.alert("Clicked")}
            />
          </div>
          <div id="filter-icon-button" className="mr-1">
            <IconButton
              id="filter-default-icon-button"
              kind="default"
              iconKind="filter"
              onClick={() => window.alert("Clicked")}
            />
          </div>
        </div>
      </div>
      <div id="button" className="mb-2">
        <h2 className="text-lg font-semibold mb-1">Button</h2>
        <div className="flex flex-row w-auto items-center">
          <div className="mr-1">
            <Button
              size="md"
              kind="primary"
              onClick={() => window.alert("Clicked")}
              id="primary-md"
            >
              Primary Medium
            </Button>
          </div>
          <div className="mr-1">
            <Button
              size="sm"
              kind="primary"
              onClick={() => window.alert("Clicked")}
              id="primary-sm"
            >
              Primary Small
            </Button>
          </div>
          <div className="mr-1">
            <Button
              size="md"
              kind="secondary"
              id="sec-md"
              onClick={() => window.alert("Clicked")}
            >
              Secondary Medium
            </Button>
          </div>
          <div className="mr-1">
            <Button
              size="sm"
              kind="secondary"
              id="sec-sm"
              onClick={() => window.alert("Clicked")}
            >
              Secondary Small
            </Button>
          </div>
          <div className="mr-1">
            <Button
              size="sm"
              kind="default"
              id="def-with-icon"
              onClick={() => window.alert("Clicked")}
            >
              <Icon id="filter-icon-in-button" kind="filter" />
              &nbsp;
              <p>Default Icon</p>
            </Button>
          </div>
        </div>
      </div>
      <div id="search-bar" className="mb-2">
        <h2 className="text-lg font-semibold mb-1">SearchBar</h2>
        <div className="flex flex-row w-auto items-center">
          <div className="mr-1 w-full">
            <SearchBar
              id="oolala"
              search=""
              placeholder="Search Changelog..."
              onSearchChange={() => null}
              onSearch={() => window.alert("Searched")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
