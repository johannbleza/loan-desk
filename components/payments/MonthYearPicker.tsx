"use client";
import { months } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addYears, format } from "date-fns";
import { useEffect, useState } from "react";

interface MonthYearPickerProps {
  yearsRange?: number;
  defaultValue?: Date;
  onChange: (monthyYear: Date) => void;
}

const MonthYearPicker = ({
  yearsRange = 5,
  defaultValue = new Date(),
  onChange,
}: MonthYearPickerProps) => {
  const years = [];

  const [month, setMonth] = useState(defaultValue.getMonth());
  const [year, setYear] = useState(defaultValue.getFullYear());

  useEffect(() => {
    const date = new Date(year, month);
    onChange(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  for (let i = -yearsRange; i < yearsRange; i++) {
    const newYear = format(addYears(defaultValue, i), "yyyy");
    years.push(newYear);
  }

  return (
    <div className="flex gap-2">
      <Select
        onValueChange={(value) => {
          setMonth(parseInt(value));
        }}
        defaultValue={defaultValue.getMonth().toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, index) => (
            <SelectItem key={month} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => {
          setYear(parseInt(value));
        }}
        defaultValue={defaultValue.getFullYear().toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthYearPicker;
