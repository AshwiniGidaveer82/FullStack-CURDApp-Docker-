import { Request, Response } from "express";
import Book from "../models/book.model";

export const createBook = async (req: Request, res: Response) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

export const getBooks = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const total = await Book.countDocuments();
  const data = await Book.find().skip(skip).limit(limit);

  res.json({
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data
  });
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};