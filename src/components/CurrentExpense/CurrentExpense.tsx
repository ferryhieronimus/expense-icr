import { ReactComponent as DollarLogo } from '../../assets/dollar.svg'
import { TotalExpenses } from "../../types/TotalExpenses";

export default function CurrentExpense({ total }: { total: TotalExpenses | undefined}) {
  return (
    <div className='bg-almost-white p-4 rounded-md shadow-md flex flex-col gap-2'>
      <div className='font-inter font-bold text-md'>Current Expenses</div>
      <div className='font-inter font-bold flex items-center text-light-blue text-lg'>
        <DollarLogo className='mr-2' />
        {total !== undefined && total.total}
      </div>
    </div>
  );
}
