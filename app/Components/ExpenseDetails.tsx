import { Expense } from "../models/userModel";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export interface ExpenseDataDef extends Expense {
  timestamp: string;
}

const ExpenseDetails = ({
  category,
  amount_spent,
  description,
  timestamp,
}: ExpenseDataDef) => {
  return (
    <div className="bg-white p-5  relative rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <span className="absolute flex right-[1rem] gap-2 ">
           <DriveFileRenameOutlineIcon className="cursor-pointer hover:text-blue-600"/>
            <DeleteOutlineIcon className=" cursor-pointer hover:text-red-600 "/>
        </span>
      <h1 className="text-lg font-medium text-gray-700">{category}</h1>
      <p className="text-gray-500 text-sm">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-semibold text-green-600">
          ₹{amount_spent.toFixed(2)}
        </span>
        <span className="text-sm text-gray-400">
          {new Date(timestamp).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ExpenseDetails;
