import ExpensesMin from "./ExpensesMin";
import ExpensesMax from "./ExpensesMax";
import { ReactComponent as HomeLogo } from "../../assets/house.svg";
import { ReactComponent as FoodLogo } from "../../assets/pizza.svg";
import { ReactComponent as CarLogo } from "../../assets/car.svg";
import { ReactComponent as BeerLogo } from "../../assets/beer.svg";
import { ReactComponent as FilterLogo } from "../../assets/filter.svg";
import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/expenseServices";

export default function FilterPanel() {
  const [params, setParams] = useSearchParams();
  const [checkBox, setCheckBox] = useState<string[]>(
    params.getAll("category_id").length !== 0
      ? params.get("category_id")!.split(",")
      : []
  );

  const fetchCategories = async () => {
    const categories = await getCategories();
    return categories;
  };

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (checkBox.length !== 0) {
      params.set("category_id", checkBox.join(","));
    } else {
      params.delete("category_id");
    }
    setParams(params);
  }, [checkBox]);

  const handleChangeCheckbox = (ID: string) => {
    if (checkBox.includes(ID)) {
      setCheckBox(checkBox.filter((id) => id !== ID));
    } else {
      setCheckBox(checkBox.concat(ID));
    }
  };

  const getLogo = (name: string) => {
    switch (name) {
      case "Transportation":
        return <CarLogo className='w-[24px] h-[24px] mx-2' />;
      case "Food":
        return <FoodLogo className='w-[24px] h-[24px] mx-2' />;
      case "Housing":
        return <HomeLogo className='w-[24px] h-[24px] mx-2' />;
      case "Personal Spending":
        return <BeerLogo className='w-[24px] h-[24px] mx-2' />;
      default:
        return "";
    }
  };

  return (
    <div className='bg-almost-white min-h-full p-4 rounded-md shadow-md flex flex-col wrap justify-between'>
      <div className='flex gap-2 items-center'>
        <FilterLogo className='w-[18px]' />
        <div className='font-inter font-bold text-lg'>Filters</div>
      </div>
      <div className='font-inter font-semibold text-xs'>
        Filter by Transaction Category
      </div>
      <div className='flex flex-col gap-2'>
        {categoryQuery.data?.map((category) => (
          <div className='flex items-center' key={category.id}>
            <input
              type='checkbox'
              name={category.name}
              id={category.id}
              checked={checkBox.includes(category.id)}
              onChange={() => handleChangeCheckbox(category.id)}
            />
            {getLogo(category.name)}
            <label
              htmlFor={category.id}
              className='font-inter font-medium text-xs cursor-pointer select-none'
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
      <hr className='border-gray-400 my-2' />
      <div className='font-inter font-semibold text-xs'>
        Filter by Expenses Range
      </div>
      <div className='flex justify-between items-center flex-wrap'>
        <div className='flex flex-col items-center'>
          <label className='font-inter italic font-medium text-xs'>Min</label>
          <ExpensesMin />
        </div>
        <div className='border-t-2 w-4 border-slate-500 mt-4' />
        <div className='flex flex-col items-center'>
          <label className='font-inter italic font-medium text-xs'>Max</label>
          <ExpensesMax />
        </div>
      </div>
    </div>
  );
}
