import React from "react";
import { ReactComponent as HomeLogo } from "../../assets/house.svg";
import { ReactComponent as FoodLogo } from "../../assets/pizza.svg";
import { ReactComponent as CarLogo } from "../../assets/car.svg";
import { ReactComponent as BeerLogo } from "../../assets/beer.svg";
import { ReactComponent as DollarLogo } from "../../assets/dollar.svg";
import { Expense } from "../../types/Expense";
import { Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";

const Logo = (category: string) => {
  switch (category) {
    case "Food":
      return <FoodLogo />;
    case "Transportation":
      return <CarLogo />;
    case "Housing":
      return <HomeLogo />;
    case "Personal Spending":
      return <BeerLogo />;
  }
};

export default function ExpenseCard({ data }: { data: Expense | undefined }) {
  return (
    <NavLink to={`${data?.id}`} >
      <div className='bg-almost-white py-4 px-8 rounded-md shadow-md flex justify-between items-center min-w-full'>
        <div className='flex items-center '>
          {data !== undefined && Logo(data!.category.name)}
          {data === undefined && <Skeleton width={"4rem"} height={"4rem"} />}

          <div className='flex flex-col justify-center ml-4'>
            {data !== undefined && (
              <>
                <div className='font-inter text-sm'>{data!.category.name}</div>
                <div className='font-inter font-medium text-md'>
                  Buy a house
                </div>
              </>
            )}
            {data === undefined && (
              <>
                <Skeleton width={"6rem"} />
                <Skeleton width={"6rem"} />
              </>
            )}
          </div>
        </div>

        {data !== undefined && (
          <div className='font-inter font-bold flex justify-center items-center text-light-blue text-lg mr-4'>
            <DollarLogo className='mr-2' />
            {data!.amount}
          </div>
        )}

        {data === undefined && (
          <div className='font-inter font-bold flex justify-center items-center text-light-blue text-lg mr-4'>
            <DollarLogo className='mr-2' />
            <Skeleton width={40} />
          </div>
        )}
      </div>
    </NavLink>
  );
}