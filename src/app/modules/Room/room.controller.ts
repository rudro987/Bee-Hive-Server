const getAllModuleName = catchAsync(async (req, res) => {
  const result = await ModuleServices.getAllServiceFromDB(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'ModuleName are retrieved succesfully!',
    data: result,
  });
});

const getSingleModuleName = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ModuleServices.getSingleServiceFromDB(id);

    res.status(httpStatus.OK).json({
        success: true,
        message: 'ModuleName is retrieved succesfully!',
        data: result,
      });
});

const updateModuleName = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await ModuleServices.updateServiceIntoDB(id, faculty);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'ModuleName is updated succesfully!',
    data: result,
  });
});

const deleteModuleName = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ModuleServices.deleteServiceFromDB(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'ModuleName is deleted succesfully!',
    data: result,
  });
});

export const moduleControllers = {
  getAllModuleName,
  getSingleModuleName,
  deleteModuleName,
  updateModuleName,
};