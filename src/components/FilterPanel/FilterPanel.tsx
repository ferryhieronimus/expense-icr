import ExpensesMin from "./ExpensesMin";
import ExpensesMax from "./ExpensesMax";
import { ReactComponent as HomeLogo } from "../../assets/house.svg";
import { ReactComponent as FoodLogo } from "../../assets/pizza.svg";
import { ReactComponent as CarLogo } from "../../assets/car.svg";
import { ReactComponent as BeerLogo } from "../../assets/beer.svg";
import { ReactComponent as FilterLogo } from "../../assets/filter.svg";
import { useState, useContext, useEffect } from "react";
import { ExpenseContext } from "../../contexts/ExpenseContext";
import { Checkbox } from "../../types/Checkbox";

export default function FilterPanel() {
  const expenseContext = useContext(ExpenseContext);
  const [isChecked, setIsChecked] = useState<Checkbox>({} as Checkbox);
  const [checkBox, setCheckBox] = useState<string[]>(
    expenseContext.params.getAll("category_id").length !== 0
      ? expenseContext.params.get("category_id")!.split(",")
      : []
  );

  const HousingCategoryID = "afc106af-2790-4df0-8ed2-473d6ef4b595";
  const TransportCategoryID = "d8e6963a-b544-4c31-bc90-6bb3e15203e2";
  const FoodCategoryID = "f12399a7-302c-452a-89d8-5ec21c4514e8";
  const PersonalCategoryID = "6bcd7235-717e-43b9-bed1-13e0b04e4c0b";

  const getID = (id: string) => {
    switch (id) {
      case HousingCategoryID:
        return "housing";
      case TransportCategoryID:
        return "transportation";
      case FoodCategoryID:
        return "food";
      case PersonalCategoryID:
        return "personalSpending";
      default:
        return "";
    }
  };

  useEffect(() => {
    checkBox.forEach((id) => {
      setIsChecked(isChecked => ({ ...isChecked, [getID(id)]: true }));
    });

    if (checkBox.length !== 0) {
      expenseContext.params.set("category_id", checkBox.join(","));
    } else {
      expenseContext.params.delete("category_id");
    }
    expenseContext.setParams(expenseContext.params);
  }, [checkBox]);

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    ID: string
  ) => {
    if (checkBox.includes(ID)) {
      setCheckBox(checkBox.filter((id) => id !== ID));
    } else {
      setCheckBox(checkBox.concat(ID));
    }
    setIsChecked({
      ...isChecked,
      [e.target.name]: !isChecked[e.target.name as keyof Checkbox],
    });
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
        <div className='flex items-center'>
          <input
            type='checkbox'
            name='housing'
            id='housing'
            checked={isChecked.housing ?? false}
            onChange={(e) => handleChangeCheckbox(e, HousingCategoryID)}
          />
          <HomeLogo className='w-[24px] h-[24px] mx-2' />
          <label
            htmlFor='housing'
            className='font-inter font-medium text-xs cursor-pointer select-none'
          >
            Housing
          </label>
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            name='food'
            id='food'
            checked={isChecked.food ?? false}
            onChange={(e) => handleChangeCheckbox(e, FoodCategoryID)}
          />
          <FoodLogo className='w-[24px] h-[24px] mx-2' />
          <label
            htmlFor='food'
            className='font-inter font-medium text-xs cursor-pointer select-none'
          >
            Food
          </label>
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            name='transportation'
            id='transportation'
            checked={isChecked.transportation ?? false}
            onChange={(e) => handleChangeCheckbox(e, TransportCategoryID)}
          />
          <CarLogo className='w-[24px] h-[24px] mx-2' />
          <label
            htmlFor='transportation'
            className='font-inter font-medium text-xs cursor-pointer select-none'
          >
            Transportation
          </label>
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            name='personalSpending'
            id='personalSpending'
            checked={isChecked.personalSpending ?? false}
            onChange={(e) => handleChangeCheckbox(e, PersonalCategoryID)}
          />
          <BeerLogo className='w-[24px] h-[24px] mx-2' />
          <label
            htmlFor='personalSpending'
            className='font-inter font-medium text-xs cursor-pointer select-none'
          >
            Personal Spending
          </label>
        </div>
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
