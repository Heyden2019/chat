import { MessagesController } from './../controllers/messages';
import { registerValidator, userUpdateValidator, loginValidator } from './../util/validators/userValidator';
import isAuthenticated from "./../util/isAuthenticated"
import {UsersController} from './../controllers/users'
import { TasksController } from './../controllers/tasks';
import { taskCreateValidator, taskUpdateValidator } from './../util/validators/taskValidator';
import { StatusesController } from './../controllers/statuses';
import { statusCreateValidator, statusUpdateValidator } from './../util/validators/statusValidator';
import { ImageController } from './../controllers/images';
import requestCleaner from './../util/requestCleaner'
import { DialogsController } from './../controllers/dialogs';
import multerUploader from './../util/multerUploader';
import lastSeenUpdMiddleware from './../util/lastSeenUpdMiddleware';

const RoutesCreator = (app, io) => {

    app.use(lastSeenUpdMiddleware);
    
    const UsersCtrl = new UsersController(io)
    const TaskCtrl = new TasksController()
    const StatusesCtrl = new StatusesController()
    const ImageCtrl = new ImageController()
    const DialogsCtrl = new DialogsController()
    const MessagesCtrl = new MessagesController(io)
    
    //users routes
    app.get("/api/users", UsersCtrl.getUsers)
    app.get("/api/users/me", UsersCtrl.getMe)
    app.get("/api/users/logout", isAuthenticated, UsersCtrl.logout)
    app.get("/api/users/:id", UsersCtrl.getUserById)
    app.post("/api/users/register", registerValidator, requestCleaner, UsersCtrl.register)
    app.post("/api/users/login", loginValidator, requestCleaner, UsersCtrl.login)
    app.put("/api/users", isAuthenticated, userUpdateValidator, requestCleaner, UsersCtrl.updateUserById)
    app.delete("/api/users", isAuthenticated, UsersCtrl.deleteUserById)

    //tasks routes
    app.get("/api/tasks", TaskCtrl.getTasks)
    app.get("/api/tasks/:id", TaskCtrl.getTaskById)
    app.post("/api/tasks", isAuthenticated, taskCreateValidator, requestCleaner, TaskCtrl.createTask)
    app.put("/api/tasks/:id", isAuthenticated, taskUpdateValidator, requestCleaner, TaskCtrl.updateTask)
    app.delete("/api/tasks/:id", isAuthenticated, TaskCtrl.deleteTask)

    //statuses routes
    app.get("/api/statuses", StatusesCtrl.getAllStatuses)
    app.get("/api/statuses/:id", StatusesCtrl.getStatusById)
    app.post("/api/statuses", isAuthenticated, statusCreateValidator, requestCleaner, StatusesCtrl.createStatus)
    app.put("/api/statuses/:id", isAuthenticated, statusUpdateValidator, requestCleaner, StatusesCtrl.updateStatusById)
    app.delete("/api/statuses/:id", isAuthenticated, StatusesCtrl.deleteStatus)

    // images routes
    // app.get('/api/images/:id', isAuthenticated,ImageCtrl.getPhotoById)
    app.post('/api/images', isAuthenticated, multerUploader.single("Image"), ImageCtrl.uploadNewPhoto)
    
    //dialogs routes
    app.get('/api/dialogs', isAuthenticated, DialogsCtrl.getAllDialogs)
    
    //message routes
    app.get('/api/messages/:userid', isAuthenticated, MessagesCtrl.getMessagesByPartnerId)
    app.post('/api/messages/:userid', isAuthenticated, MessagesCtrl.createMessage)

}

export default RoutesCreator