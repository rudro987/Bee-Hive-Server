import { User } from "./user.model";

const getAllUsersFromDB = async () => {
    const result = await User.find();
  
    return result;
  };

  export const UserServices = {
    getAllUsersFromDB
  };