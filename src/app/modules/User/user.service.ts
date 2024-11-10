import { TUserTypes } from "./user.interface";
import { User } from "./user.model";

const getAllUsersFromDB = async () => {
    const result = await User.find();
  
    return result;
  };

  const updateRoleIntoDB = async (
    id: string,
    payload: Partial<TUserTypes>,
  ) => {
    const result = await User.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };

  export const UserServices = {
    getAllUsersFromDB,
    updateRoleIntoDB
  };