"use client";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface LoanDatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const LoanDatePicker = ({ value, onChange }: LoanDatePickerProps) => {
  const [openDate, setOpenDate] = useState(false);

  return (
    <Popover open={openDate} onOpenChange={setOpenDate}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="justify-between font-normal"
        >
          {value ? new Date(value).toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          captionLayout="dropdown"
          onSelect={(date) => {
            onChange(date ? date.toLocaleDateString() : "");
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default LoanDatePicker;
