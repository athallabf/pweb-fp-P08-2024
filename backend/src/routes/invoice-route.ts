// routes/invoiceRoute.ts
import { Router } from "express";
import { downloadInvoice } from "../controller/invoice-controller";

const invoiceRouter = Router();

// Protected route for downloading invoices
invoiceRouter.get("/downloads/:paymentId", downloadInvoice);

export default invoiceRouter;
