export type TEnumTypes = 'male' | 'female' | 'other';
export type TUserTypes = {
};

export interface ExampleModel extends Model<TUserTypes> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TUserTypes | null>;
  // instance methods for checking if the user exists
  isUserExistsByCustomId(id: string): Promise<TUser>;
  // instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;