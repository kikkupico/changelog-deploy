import * as React from "react";
import { Label } from "../design";
import { Offering } from "../../utils/useOfferings";

type Props = {
  selectedOffering: Offering;
  onSelectOffering: (o: Offering) => void;
};

const allOfferings: Offering[] = [
  "cloud",
  "community-edition",
  "enterprise-edition",
];
const getOfferingLabelText = (o: Offering) => {
  switch (o) {
    case "cloud":
      return "Hasura Cloud";
    case "community-edition":
      return "Hasura CE";
    case "enterprise-edition":
      return "Hasura EE";
  }
};

export const OfferingPanel: React.FC<Props> = ({
  selectedOffering,
  onSelectOffering,
}) => {
  return (
    <div className="flex items-center w-full">
      {allOfferings.map((o) => {
        return (
          <div className="mr-2" key={o}>
            <Label
              id={`offering-label-${o}`}
              kind={selectedOffering === o ? "active" : "default"}
              onClick={() => onSelectOffering(o)}
              text={getOfferingLabelText(o)}
            />
          </div>
        );
      })}
    </div>
  );
};
