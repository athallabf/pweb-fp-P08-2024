import { Router } from "express";
import {
  createDamageReport,
  createPayment,
  createUserReport,
  getInvoiceHistory,
  getRoomOccupancy,
  getUserPayments,
} from "../controller/penghuni-controller";
import { Verification } from "../middleware/auth";

export const penghuniRouter = Router();

penghuniRouter.get("/", Verification, getInvoiceHistory);
penghuniRouter.get("/payments", Verification, getUserPayments);
penghuniRouter.get("/sewa", Verification, getRoomOccupancy);
penghuniRouter.post("/sewa/bayar", Verification, createPayment);
penghuniRouter.post("/laporan/fasilitas", Verification, createDamageReport);
penghuniRouter.post("/laporan/penghuni", Verification, createUserReport);

export default penghuniRouter;
