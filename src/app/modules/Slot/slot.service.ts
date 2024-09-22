const getAllServiceFromDB = async (query: Record<string, unknown>) => {
    const result = await Model.find();
    return result;
};

const getSingleServiceFromDB = async (id: string) => {
    const result = await Model.findById(id);
    return result;
};

const updateServiceIntoDB = async (id: string, payload: Partial<TType>) => {
    const result = await Model.findByIdAndUpdate(id, payload, { new: true, runvalidators: true });
    return result;
};

const deleteServiceFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // Mark the service as deleted by setting 'isDeleted' to true
        const deletedModuleName = await Model.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedModuleName) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Service');
        }

        // Retrieve the user ID associated with the service and mark the user as deleted
        const userId = deletedModuleName.user;

        const deletedUser = await UserModule.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
        }

        // Commit the transaction if all updates were successful
        await session.commitTransaction();
        await session.endSession();

        return deletedModuleName;
    } catch (err) {
        // Roll back the transaction in case of error
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete Service');
    }
};

export const moduleServices = {
    getAllServiceFromDB,
    getSingleServiceFromDB,
    updateServiceIntoDB,
    deleteServiceFromDB
};
