"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const createBook = async (req, res) => {
    const book = await book_model_1.default.create(req.body);
    res.status(201).json(book);
};
exports.createBook = createBook;
const getBooks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await book_model_1.default.countDocuments();
    const data = await book_model_1.default.find().skip(skip).limit(limit);
    res.json({
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data
    });
};
exports.getBooks = getBooks;
const updateBook = async (req, res) => {
    const book = await book_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    await book_model_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
};
exports.deleteBook = deleteBook;
