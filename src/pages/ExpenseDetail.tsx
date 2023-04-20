import { useEffect, useState } from "react";
import { getExpensesDetails } from "../services/expenseServices";
import { ReactComponent as HomeLogo } from "../assets/house.svg";
import { ReactComponent as FoodLogo } from "../assets/pizza.svg";
import { ReactComponent as CarLogo } from "../assets/car.svg";
import { ReactComponent as BeerLogo } from "../assets/beer.svg";
import { ReactComponent as DollarLogo } from "../assets/dollar.svg";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const Logo = (category: string) => {
  switch (category) {
    case "Food":
      return <FoodLogo className='w-[45px] h-[45px] mr-4' />;
    case "Transportation":
      return <CarLogo className='w-[45px] h-[45px] mr-4' />;
    case "Housing":
      return <HomeLogo className='w-[45px] h-[45px] mr-4' />;
    case "Personal Spending":
      return <BeerLogo className='w-[45px] h-[45px] mr-4' />;
  }
};

export default function ExpenseDetail() {
  const id = useParams();
  const [name, setName] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [createdAt, setCreatedAt] = useState<Date>();
  const [desc, setDesc] = useState<string>();
  const [category, setCategory] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    getExpensesDetails(id.id!).then((expenseDetails) => {
      setAmount(expenseDetails.amount);
      setName(expenseDetails.name);
      setCreatedAt(expenseDetails.created_at);
      setDesc(expenseDetails.description);
      setCategory(expenseDetails.category.name);
    });
  }, []);

  return (
    <div className='grid grid-cols-4'>
      <div>
        <div
          className='font-inter font-bold text-white text-lg cursor-pointer'
          onClick={() => navigate(-1)}
        >
          &lt;- Back
        </div>
      </div>
      <div className='bg-almost-white col-span-2 max-w-xl min-h-full min-w-full p-12 rounded-md shadow-md flex flex-col wrap justify-between'>
        <div className='flex justify-between items-center font-inter'>
          <div className='font-inter font-bold flex justify-center items-center text-sm'>
            {Logo(category!)}
            {name}
          </div>
          <div className='font-inter font-bold flex justify-center items-center text-light-blue text-lg'>
            <DollarLogo className='mr-4' />
            {amount}
          </div>
        </div>
        <hr className='border-gray-400 my-4' />
        <div className='flex flex-col gap-4'>
          <div className='font-inter font-medium text-sm'>
            Transaction Details
          </div>
          <div className='flex justify-between items-center'>
            <div className='font-inter text-xs'>ID</div>
            <div className='font-inter text-xs font-bold'>{id.id}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='font-inter text-xs'>Type</div>
            <div className='font-inter text-xs font-bold'>{category}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='font-inter text-xs'>Time</div>
            <div className='font-inter text-xs font-bold'>
              {moment(createdAt).format("DD MMM YYYY, HH:mm [WIB]")}
            </div>
          </div>
          <hr className='border-gray-700 my-2' />
          <div className='font-inter'>Notes</div>
          <div className='font-inter text-xs'>{desc}</div>
        </div>
      </div>
    </div>
  );
}
