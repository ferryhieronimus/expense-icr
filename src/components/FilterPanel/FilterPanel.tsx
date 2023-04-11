import React from "react";
import ExpensesRange from "./ExpensesRange";
import { ReactComponent as HomeLogo } from "../../assets/house.svg";
import { ReactComponent as FoodLogo } from "../../assets/pizza.svg";
import { ReactComponent as CarLogo } from "../../assets/car.svg";
import { ReactComponent as BeerLogo } from "../../assets/beer.svg";
import { ReactComponent as FilterLogo } from "../../assets/filter.svg";

export default function FilterPanel() {
  return (
    <div className='bg-almost-white min-h-full p-4 rounded-md shadow-md flex flex-col wrap justify-between'>
      <div className='flex gap-2 items-center'>
        <FilterLogo className="w-[18px]"/>
        <div className='font-inter font-bold text-lg'>Filters</div>
      </div>
      <div className='font-inter font-semibold text-xs'>
        Filter by Transaction Category
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center'>
          <input type='checkbox' name='housing' id='housing' />
          <HomeLogo className='w-[24px] h-[24px] mx-2' />
          <label
            htmlFor='housing'
            className='font-inter font-medium text-xs cursor-pointer select-none'
          >
            Housing
          </label>
        </div>
        <div className='flex items-center'>
          <input type='checkbox' name='food' id='food' />
          <FoodLogo className='w-[24px] h-[24px] mx-2' />
          <label
            htmlFor='food'
            className='font-inter font-medium text-xs cursor-pointer select-none'
          >
            Food
          </label>
        </div>
        <div className='flex items-center'>
          <input type='checkbox' name='transportation' id='transportation' />
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
          <ExpensesRange />
        </div>
        <div className='border-t-2 w-4 border-slate-500' />
        <div className='flex flex-col items-center'>
          <label className='font-inter italic font-medium text-xs'>Max</label>
          <ExpensesRange />
        </div>
      </div>
    </div>
  );
}
