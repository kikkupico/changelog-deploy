import * as React from "react";

type Props = {
  id: string;
  date?: number;
  onChange?: (date?: Date) => void;
};

export const DateInput: React.FC<Props> = ({ date, onChange, id }) => {
  const value =
    date != undefined && !isNaN(date)
      ? new Date(date).toLocaleString("en-CA", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : undefined;
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      if (e.target.value == "") {
        onChange(undefined);
      } else {
        const date = new Date(e.target.value);
        if (date.getTime() >= 0) {
          onChange(date);
        }
      }
    }
  };

  return (
    <input
      id={id}
      data-testid={id}
      value={value || ""}
      type="date"
      className={`text-sm font-semibold text-gray-400 w-full h-8 px-2 rounded border border-gray-400 outline-none hover:shadow hover:border-gray-500 focus:border focus:border-brandBlue-400 focus:ring-1 focus:ring-brandBlue-400`}
      placeholder="Date From..."
      onChange={onDateChange}
    />
  );
};
