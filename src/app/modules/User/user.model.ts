const exampleNameSchema = new Schema<TNameTypes>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const exampleUserSchema = new Schema<TUserTypes, ExampleModel>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
  },
  name: {
    type: exampleNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male, female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloogGroup: {
    type: String,
    enum: {
      values: BloodGroup,
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  profileImg: { type: String, default: '' },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, 'Acadcemic Department is required'],
    ref: 'AcademicDepartment',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Acadcemic Faculty is required'],
    ref: 'AcademicFaculty',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  toJSON: {
    virtuals: true,
  },
});

// generating full name
exampleUserSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    '' +
    this?.name?.middleName +
    '' +
    this?.name?.lastName
  );
});

// secure password using bcrypt and save into data
exampleUserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
exampleUserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// filter out deleted documents
exampleUserSchema.pre('find', function (next) {
  this.find({ isDeleted: { ne: true } });
  next();
});

exampleUserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { ne: true } });
  next();
});

exampleUserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ match: { isDeleted: { ne: true } } });
  next();
});

// static methods
// checking if user is already exist!
exampleUserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

exampleUserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

exampleUserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

exampleUserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const Example = model<TUserTypes, ExampleModel>('Example', exampleUserSchema);