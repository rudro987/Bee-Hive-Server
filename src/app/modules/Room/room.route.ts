const router = express.Router();

router.get('/', moduleControllers.getAllModuleName);

router.get('/:id', moduleControllers.getSingleModuleName);

router.patch('/:id', moduleControllers.updateModuleName);

router.delete('/:id', moduleControllers.deleteModuleName);

export const ModuleRoutes = router;