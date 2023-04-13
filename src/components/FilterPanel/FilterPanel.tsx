import ExpensesMin from "./ExpensesMin";
import ExpensesMax from "./ExpensesMax";
import { ReactComponent as HomeLogo } from "../../assets/house.svg";
import { ReactComponent as FoodLogo } from "../../assets/pizza.svg";
import { ReactComponent as CarLogo } from "../../assets/car.svg";
import { ReactComponent as BeerLogo } from "../../assets/beer.svg";
import { ReactComponent as FilterLogo } from "../../assets/filter.svg";
import { useState, useContext, useEffect } from "react";
import { ExpenseContext } from "../../contexts/ExpenseContext";

export default function FilterPanel() {
  const expenseContext = useContext(ExpenseContext);
  const [isHousingChecked, setIsHousingChecked] = useState<boolean>(false);
  const [isTransportChecked, setIsTransportChecked] = useState<boolean>(false);
  const [isFoodChecked, setIsFoodChecked] = useState<boolean>(false);
  const [isPersonalChecked, setIsPersonalChecked] = useState<boolean>(false);
  const [checkBox, setCheckBox] = useState<string[]>(
    expenseContext.params.getAll("category_id").length !== 0
      ? expenseContext.params.getAll("category_id")[0]?.split(",")
      : []
  );

  const HousingCategoryID = "afc106af-2790-4df0-8ed2-473d6ef4b595";
  const TransportCategoryID = "d8e6963a-b544-4c31-bc90-6bb3e15203e2";
  const FoodCategoryID = "f12399a7-302c-452a-89d8-5ec21c4514e8";
  const PersonalCategoryID = "6bcd7235-717e-43b9-bed1-13e0b04e4c0b";

  useEffect(() => {
    checkBox.forEach((id) => {
      if (id === HousingCategoryID) setIsHousingChecked(true);
      if (id === TransportCategoryID) setIsTransportChecked(true);
      if (id === FoodCategoryID) setIsFoodChecked(true);
      if (id === PersonalCategoryID) setIsPersonalChecked(true);
    });

    if (checkBox.length !== 0) {
      expenseContext.params.set("category_id", checkBox.join(","));
    } else {
      expenseContext.params.delete("category_id");
    }
    expenseContext.setParams(expenseContext.params);
  }, [checkBox]);

  const handleChangeHousing = () => {
    if (checkBox?.includes(HousingCategoryID)) {
      setCheckBox(checkBox.filter((id) => id !== HousingCategoryID));
    } else {
      setCheckBox(checkBox.concat(HousingCategoryID));
    }
    setIsHousingChecked(!isHousingChecked);
  };

  const handleChangeTransport = () => {
    if (checkBox?.includes(TransportCategoryID)) {
      setCheckBox(checkBox.filter((id) => id !== TransportCategoryID));
    } else {
      setCheckBox(checkBox.concat(TransportCategoryID));
    }
    setIsTransportChecked(!isTransportChecked);
  };

  const handleChangeFood = () => {
    if (checkBox.includes(FoodCategoryID)) {
      setCheckBox(checkBox.filter((id) => id !== FoodCategoryID));
    } else {
      setCheckBox(checkBox.concat(FoodCategoryID));
    }
    setIsFoodChecked(!isFoodChecked);
  };

  const handleChangePersonal = () => {
    if (checkBox.includes(PersonalCategoryID)) {
      setCheckBox(checkBox.filter((id) => id !== PersonalCategoryID));
    } else {
      setCheckBox(checkBox.concat(PersonalCategoryID));
    }
    setIsPersonalChecked(!isPersonalChecked);
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
            checked={isHousingChecked}
            onChange={handleChangeHousing}
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
            checked={isFoodChecked}
            onChange={handleChangeFood}
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
            checked={isTransportChecked}
            onChange={handleChangeTransport}
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
            name='personal-spending'
            id='personal-spending'
            checked={isPersonalChecked}
            onChange={handleChangePersonal}
          />
          <BeerLogo className='w-[24px] h-[24px] mx-2' />
          <label
            htmlFor='personal-spending'
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
        <div className='border-t-2 w-4 border-slate-500 mt-4'/>
        <div className='flex flex-col items-center'>
          <label className='font-inter italic font-medium text-xs'>Max</label>
          <ExpensesMax />
        </div>
      </div>
    </div>
  );
}
