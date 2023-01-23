import { PrismaClient } from "@prisma/client";
import env from "../config/env";

interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
