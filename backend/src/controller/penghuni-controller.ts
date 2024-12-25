import { Request, Response } from "express";
import path from "path";
import { User } from "../models/home-model";
import {
  DamageReporting,
  InvoiceHistory,
  Payment,
  RoomOccupancy,
  UserReport,
} from "../models/penghuni-model";
import { generateInvoicePDF } from "../utils/pdfUtils";

// Controller untuk menampilkan history tagihan
export const getInvoiceHistory = async (req: Request, res: Response) => {
  try {
    const invoiceHistory = await InvoiceHistory.find();
    res.status(200).json(invoiceHistory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoice history", error });
  }
};

// Controller untuk membuat pembayaran
export const createPayment = async (req: Request, res: Response) => {
  try {
    console.log("Received payment request:", req.body); // Add this for debugging

    const { total_bill, payment_method, rent_periods, bank_name } = req.body;

    // Validate required fields
    if (!total_bill || !payment_method || !rent_periods) {
      res.status(400).json({
        message:
          "Missing required fields: total_bill, payment_method, or rent_periods",
      });
    }

    // Validate bank_name for BANK_TRANSFER
    if (payment_method === "BANK_TRANSFER" && !bank_name) {
      res.status(400).json({
        message: "Bank name is required for bank transfer payments",
      });
    }

    const newPayment = new Payment({
      total_bill,
      payment_method,
      rent_periods,
      bank_name: payment_method === "BANK_TRANSFER" ? bank_name : undefined,
    });

    console.log("Creating payment with data:", newPayment); // Add this for debugging

    await newPayment.save();

    const pdfPath = await generateInvoicePDF(newPayment);

    console.log("Payment created successfully:", newPayment); // Add this for debugging

    res.status(201).json({
      message: "Payment created successfully",
      payment: newPayment,
      invoice: path.basename(pdfPath),
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({
      message: "Error creating payment",
      error: error instanceof Error ? error.message : "Unknown error",
      details: error instanceof Error ? error.stack : undefined,
    });
  }
};

export const createDamageReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { message, username } = req.body; // Ambil message dan username dari request body

  try {
    // Cari pengguna berdasarkan username (atau nama) yang diberikan di request body
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Buat laporan kerusakan dengan menggunakan ID pengguna
    const newReport = new DamageReporting({
      user: user._id, // Menyimpan ID pengguna (referensi ke model User)
      message,
    });

    // Simpan laporan kerusakan ke database
    await newReport.save();

    // Kembalikan respons sukses dengan message dan nama pengguna
    res.status(201).json({
      message: "Damage report created successfully",
      report: {
        message: newReport.message,
        user: user.username, // Menambahkan nama pengguna pada respons
      },
    });
  } catch (error) {
    // Tangani error jika ada
    res.status(500).json({ message: "Error creating damage report", error });
  }
};

// Controller untuk membuat laporan penghuni
export const createUserReport = async (req: Request, res: Response) => {
  const { message } = req.body;

  try {
    const newReport = new UserReport({
      message,
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: "Error creating user report", error });
  }
};

// Controller untuk menampilkan status okupansi kamar
export const getRoomOccupancy = async (req: Request, res: Response) => {
  try {
    const occupancy = await RoomOccupancy.find();
    res.status(200).json(occupancy);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room occupancy", error });
  }
};

// Add this new controller function
export const getUserPayments = async (req: Request, res: Response) => {
  try {
    // Get user payments sorted by creation date (newest first)
    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .select("total_bill payment_method created_at");

    // Transform the data to match the frontend format
    const formattedPayments = payments.map((payment) => ({
      total: payment.total_bill,
      date: payment.created_at,
      status: "Lunas", // Since these are completed payments
      payment_method: payment.payment_method,
    }));

    res.status(200).json(formattedPayments);
  } catch (error) {
    console.error("Error fetching user payments:", error);
    res.status(500).json({
      message: "Error fetching payment history",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
