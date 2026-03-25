import getConnection from "../config/database";
import prisma from "../lib/prisma";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";
const saltRounds = 10;
const hashPassword = async (plainText: string) => {
  return await bcrypt.hash(plainText, saltRounds);
};
const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string,
  phone: string,
  avatar: string,
  role: string,
) => {
  const defaultPassword = await hashPassword("123456");
  const newUser = await prisma.user.create({
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: defaultPassword,
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      phone: phone,
      roleId: +role,
    },
  });
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getAllRoles = async () => {
  const roles = await prisma.role.findMany();
  return roles;
};

const handleDeleteUser = async (id: string) => {
  try {
    const connection = await getConnection();
    const sql = "DELETE FROM `users` WHERE `id` =? ";
    const values = [id];
    const [result, fields] = (await connection.execute(sql, values)) as [
      any,
      any[],
    ];
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (id: string) => {
  try {
    const connection = await getConnection();
    const sql = "SELECT * FROM `users` WHERE `id` = ?";
    const values = [id];
    const [result, fields] = (await connection.execute(sql, values)) as [
      any[],
      any[],
    ];
    return result[0];
  } catch (err) {
    console.log(err);
  }
};

const updateUserById = async (
  id: string,
  fullName: string,
  phone: string,
  role: string,
  address: string,
  avatar: string,
) => {
  const updateUser = await prisma.user.update({
    where: {
      id: +id,
    },
    data: {
      fullName: fullName,
      address: address,
      phone: phone,
      roleId: +role,
      ...(avatar !== undefined && { avatar: avatar }),
    },
  });
  return updateUser;
};
export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  getUserById,
  updateUserById,
  getAllRoles,
  hashPassword,
};
