"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
const Header = () => {
  const [position, setPosition] = React.useState("bottom");
  const [select, setSelect] = React.useState("Select");
  const selectType = ["Students", "Salaried", "Business"];
  const router = useRouter();

  return (
    <div className="h-[200px]  mt-2 flex flex-col items-center justify-around">
      <div className=" bg-black h-[60px] w-[80%] text-white rounded-[20px] mx-auto flex justify-center items-center">
        <h1 className=" text-center text-lg font-mono font-extrabold">
          Dynamic Data Collector
        </h1>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-white w-[100px]" variant="outline">
              {select}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              {selectType.map((item) => {
                return (
                  <DropdownMenuRadioItem
                    key={item}
                    value={item}
                    onSelect={() => setSelect(item)}
                    onClick={() => router.push(`/form/${item.toLowerCase()}`)}
                  >
                    {item}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
