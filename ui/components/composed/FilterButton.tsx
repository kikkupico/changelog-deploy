import * as React from "react";
import { Icon, Button } from "../design";

type Props = {
  onToggle: VoidFunction;
  filterActive: boolean;
};

export const FilterButton: React.FC<Props> = ({ onToggle, filterActive }) => {
  return (
    <Button
      size="sm"
      kind={filterActive ? "default-active" : "default"}
      id="def-with-icon"
      onClick={onToggle}
    >
      <Icon id="filter-icon-in-button" kind="filter" />
      &nbsp;{filterActive ? "Fewer Filters" : "More Filters"}
    </Button>
  );
};
