"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { log } from "console";

const Page = ({ params }: { params: any }) => {
  const [fields, setFields] = useState(false);
  const [type, setType] = useState("Field Type");
  const filedType = ["TextBox", "Date", "DropDown"];
  const [dataType, setDataType] = useState("Data Type");
  const dataTypes = ["Text", "Number", "Date", "Email", "Phone"];
  const [mandatory, setMandatory] = useState("No");
  const mandatoryType = ["Yes", "No"];
  const [fieldData, setFieldData] = useState("");
  const [filedLength, setFiledLength] = useState(0);
  const [addedFields, setAddedFields] = useState([]);

  useEffect(() => {
    // Load data from local storage based on params
    const savedData = localStorage.getItem(`form_data_${params.type}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setType(parsedData.type || "Field Type");
      setDataType(parsedData.dataType || "Data Type");
      setMandatory(parsedData.mandatory || "No");
      setFieldData(parsedData.fieldData || "");
    }

    // Load all added fields from local storage
    const allAddedFields = [];
    for (let i = 1; i <= localStorage.length; i++) {
      const key = localStorage.key(i - 1);
      if (key && key.startsWith("form_data_")) {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        allAddedFields.push(data);
      }
    }
    setAddedFields(allAddedFields as any[]);
  }, [params]);

  const addField = () => {
    setFields(true);
  };

  const addData = () => {
    // Check if there is existing data in local storage
    const existingData = localStorage.getItem(`form_data_${params.type}`);

    if (existingData) {
      // Update existing data
      const parsedExistingData = JSON.parse(existingData);
      const updatedData = {
        ...parsedExistingData,
        type,
        dataType,
        mandatory,
        fieldData,
        filedLength,
      };

      localStorage.setItem(
        `form_data_${params.type}`,
        JSON.stringify(updatedData)
      );
    } else {
      // Create new entry
      const formData = {
        type,
        dataType,
        mandatory,
        fieldData,
        filedLength,
      };

      localStorage.setItem(
        `form_data_${params.type}`,
        JSON.stringify(formData)
      );
    }

    // Reload all added fields and update state
    const allAddedFields = [];
    for (let i = 1; i <= localStorage.length; i++) {
      const key = localStorage.key(i - 1);
      if (key && key.startsWith("form_data_")) {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        allAddedFields.push(data);
      }
    }
    setAddedFields(allAddedFields as never[]);

    setFields(true);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center">
        <Button variant="secondary" onClick={addField}>
          Add Field
        </Button>
      </div>
      {fields && (
        <div>
          <form className="flex flex-wrap justify-around gap-4 items-center h-[150px] w-full">
            <div>
              <label>Filed Type</label>
              <DropdownMenu>
                <DropdownMenuTrigger className=" bg-slate-700 text-white  h-[40px] w-[150px] rounded-[10px] hover:bg-slate-500 flex justify-between items-center ">
                  <span className="pl-2">{type}</span>
                  <span>
                    <FontAwesomeIcon
                      className="pr-2"
                      icon={faChevronDown}
                      style={{ color: "#ffffff" }}
                    />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Field Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {filedType &&
                    filedType.map((item) => {
                      return (
                        <DropdownMenuItem
                          className="hover:bg-slate-500"
                          onSelect={() => setType(item)}
                        >
                          {item}
                        </DropdownMenuItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="">
              <label className="">Filed Name</label>
              <br />
              <input
                className="border-2 border-gray-300 rounded-md w-[160px] h-[40px] px-2"
                type="text"
              />
            </div>
            <div>
              <label>Filed Data Type</label>
              <DropdownMenu>
                <DropdownMenuTrigger className=" bg-slate-700 text-white  h-[40px] w-[150px] rounded-[10px] hover:bg-slate-500 flex justify-between items-center ">
                  {" "}
                  <span className="pl-2">
                    {type == "Date" ? "Date" : dataType}
                  </span>
                  <span>
                    <FontAwesomeIcon
                      className="pr-2"
                      icon={faChevronDown}
                      style={{ color: "#ffffff" }}
                    />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Select Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {dataTypes &&
                    dataTypes.map((item) => {
                      return (
                        <DropdownMenuItem
                          className="hover:bg-slate-500"
                          onSelect={() => setDataType(item)}
                        >
                          {item}
                        </DropdownMenuItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <label>Field Max length Allowed</label>
              <br />

              <input
                className="border-2 border-gray-300 rounded-md w-[160px] h-[40px] px-2"
                type="number"
                onChange={(e) => setFiledLength(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Mandatory</label>
              <DropdownMenu>
                <DropdownMenuTrigger className=" bg-slate-700 text-white  h-[40px] w-[150px] rounded-[10px] hover:bg-slate-500 flex justify-between items-center ">
                  {" "}
                  <span className="pl-2">{mandatory}</span>
                  <span>
                    <FontAwesomeIcon
                      className="pr-2"
                      icon={faChevronDown}
                      style={{ color: "#ffffff" }}
                    />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  {mandatoryType &&
                    mandatoryType.map((item) => {
                      return (
                        <DropdownMenuItem
                          className="hover:bg-slate-500"
                          onSelect={() => setMandatory(item)}
                        >
                          {item}
                        </DropdownMenuItem>
                      );
                    })}
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <label>Field Data</label>
              <br />
              <input
                className="border-2 border-gray-300 rounded-md w-[160px] h-[40px] px-2"
                type="text"
                value={fieldData}
                onChange={(e) => setFieldData(e.target.value)}
              />
            </div>
            <Button variant="secondary" onClick={addData}>
              Confirm
            </Button>
          </form>
        </div>
      )}
      <div>
        <h1>List of Added Fields</h1>
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>Field Name</th>
              <th>Field Type</th>
              <th>Field Data Type</th>
              <th>Feild Validations</th>
              <th>Field Data</th>
              <th>Is Mandatory</th>
            </tr>
          </thead>
          <tbody>
            {addedFields.map((field, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>Your Field Name</td>
                <td>{field.type}</td>
                <td>{field.dataType}</td>
                <td>Field Validations</td>
                <td>{field.fieldData}</td>
                <td>{field.mandatory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
