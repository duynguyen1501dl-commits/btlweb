import { hash } from "crypto";
import prisma from "../lib/prisma";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();

  if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Đầy đủ quyền hạn",
        },
        {
          name: "USER",
          description: "Người dùng thông thường",
        },
      ],
    });
  }
  if (countUser === 0) {
    const defaultPassword = await hashPassword("123456");
    const adminRole = await prisma.role.findFirst({
      where: { name: "ADMIN" },
    });
    if (adminRole)
      await prisma.user.createMany({
        data: [
          {
            fullName: "Duy",
            username: "duy1501@gmail.com",
            password: defaultPassword,
            address: "",
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminRole.id,
          },
          {
            fullName: "Admin",
            username: "linhtran@gmail.com",
            password: defaultPassword,
            address: "Hà Nội",
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminRole.id,
          },
          {
            fullName: "User",
            username: "admin@gmail.com",
            password: defaultPassword,
            address: "TP.HCM",
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminRole.id,
          },
        ],
      });
  }
  if (countUser !== 0 && countRole !== 0) {
    console.log(">>> ALREADY INIT DATA");
  }
};

export default initDatabase;
