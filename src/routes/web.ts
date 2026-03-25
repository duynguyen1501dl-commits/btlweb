import express, { Express } from "express";
import {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
} from "../controllers/user.controller";
import {
  getDashboardPage,
  getAdminUserPage,
  getAdminProductPage,
  getAdminOrderPage,
} from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getProductPage } from "controllers/client/product.controller";
import {
  getAdminCreateProductPage,
  postAdminCreateProductPage,
} from "controllers/admin/product.controller";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/product/:id", getProductPage);

  //admin
  router.get("/admin", getDashboardPage);
  router.get("/admin/user", getAdminUserPage);

  router.get("/admin/create-user", getCreateUserPage);

  router.post("/admin/delete-user/:id", postDeleteUser);

  router.get("/admin/view-user/:id", getViewUser);

  router.post(
    "/admin/update-user/",
    fileUploadMiddleware("avatar"),
    postUpdateUser,
  );

  router.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser,
  );

  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/order", getAdminOrderPage);

  router.get(
    "/admin/create-product",
    fileUploadMiddleware("image", "images/product"),
    getAdminCreateProductPage,
  );
  router.post(
    "/admin/create-product",
    fileUploadMiddleware("image", "images/product"),
    postAdminCreateProductPage,
  );
  app.use("/", router);
};
export default webRoutes;
