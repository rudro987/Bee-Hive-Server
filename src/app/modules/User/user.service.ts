const createModuleNameIntoDB = async (
  file: any,
  password: string,
  payload: TModuleName
) => {
  // create a user object
  const userData: Partial<TModuleTypes> = {};

  //if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'role';
  // set student email
  userData.email = payload.email;

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id using utils function
    userData.id = await generateStudentId(admissionSemester);

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary using utils function
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// const createFacultyIntoDB = async (
//   file: any,
//   password: string,
//   payload: TFaculty
// ) => {
//   // create a user object
//   const userData: Partial<TUser> = {};

//   //if password is not given, use default password
//   userData.password = password || (config.default_password as string);

//   //set faculty role
//   userData.role = 'faculty';
//   //set faculty email
//   userData.email = payload.email;

//   // find academic department info
//   const academicDepartment = await AcademicDepartment.findById(
//     payload.academicDepartment
//   );

//   if (!academicDepartment) {
//     throw new AppError(400, 'Academic department not found');
//   }

//   payload.academicFaculty = academicDepartment?.academicFaculty;

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     //set  generated id
//     userData.id = await generateFacultyId();

//     if (file) {
//       const imageName = `${userData.id}${payload?.name?.firstName}`;
//       const path = file?.path;
//       //send image to cloudinary
//       const { secure_url } = await sendImageToCloudinary(imageName, path);
//       payload.profileImg = secure_url as string;
//     }

//     // create a user (transaction-1)
//     const newUser = await User.create([userData], { session }); // array

//     //create a faculty
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }
//     // set id, _id as user
//     payload.id = newUser[0].id;
//     payload.user = newUser[0]._id; //reference _id

//     // create a faculty (transaction-2)

//     const newFaculty = await Faculty.create([payload], { session });

//     if (!newFaculty.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return newFaculty;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };

// const getMe = async (userId: string, role: string) => {
//   let result = null;
//   if (role === 'student') {
//     result = await Student.findOne({ id: userId }).populate('user');
//   }
//   if (role === 'admin') {
//     result = await Admin.findOne({ id: userId }).populate('user');
//   }

//   if (role === 'faculty') {
//     result = await Faculty.findOne({ id: userId }).populate('user');
//   }

//   return result;
// };

// const changeStatus = async (id: string, payload: { status: string }) => {
//   const result = await User.findByIdAndUpdate(id, payload, {
//     new: true,
//   });
//   return result;
// };

export const UserServices = {
  createModuleNameIntoDB,
  createFacultyIntoDB,
  getMe,
  changeStatus,
};