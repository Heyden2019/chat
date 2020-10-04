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

const RoutesCreator = (app, io) => {
    
    const UsersCtrl = new UsersController(io)
    const TaskCtrl = new TasksController()
    const StatusesCtrl = new StatusesController()
    const ImageCtrl = new ImageController()
    const DialogsCtrl = new DialogsController()
    const MessagesCtrl = new MessagesController(io)
    
    //users routes
    app.get("/users", UsersCtrl.getAllUsers)
    app.get("/users/me", isAuthenticated, UsersCtrl.getMe)
    app.get("/users/logout", isAuthenticated, UsersCtrl.logout)
    app.get("/users/:id", UsersCtrl.getUserById)
    app.post("/users/register", registerValidator, requestCleaner, UsersCtrl.register)
    app.post("/users/login", loginValidator, requestCleaner, UsersCtrl.login)
    app.put("/users", isAuthenticated, userUpdateValidator, requestCleaner, UsersCtrl.updateUserById)
    app.delete("/users", isAuthenticated, UsersCtrl.deleteUserById)

    //tasks routes
    app.get("/tasks", TaskCtrl.getTasks)
    app.get("/tasks/:id", TaskCtrl.getTaskById)
    app.post("/tasks", isAuthenticated, taskCreateValidator, requestCleaner, TaskCtrl.createTask)
    app.put("/tasks/:id", isAuthenticated, taskUpdateValidator, requestCleaner, TaskCtrl.updateTask)
    app.delete("/tasks/:id", isAuthenticated, TaskCtrl.deleteTask)

    //statuses routes
    app.get("/statuses", StatusesCtrl.getAllStatuses)
    app.get("/statuses/:id", StatusesCtrl.getStatusById)
    app.post("/statuses", isAuthenticated, statusCreateValidator, requestCleaner, StatusesCtrl.createStatus)
    app.put("/statuses/:id", isAuthenticated, statusUpdateValidator, requestCleaner, StatusesCtrl.updateStatusById)
    app.delete("/statuses/:id", isAuthenticated, StatusesCtrl.deleteStatus)

    // images routes
    app.get('/images/:id', isAuthenticated,ImageCtrl.getPhotoById)
    app.post('/images', isAuthenticated, ImageCtrl.uploadNewPhoto)
    
    //dialogs routes
    app.post('/dialogs/:userid', isAuthenticated, DialogsCtrl.createDialog)
    app.get('/dialogs', isAuthenticated, DialogsCtrl.getAllDialogs)
    
    //message routes
    app.get('/messages/:userid', isAuthenticated, MessagesCtrl.getMessagesByPartnerId)
    app.post('/messages/:userid', isAuthenticated, MessagesCtrl.createMessage)

}

export default RoutesCreator