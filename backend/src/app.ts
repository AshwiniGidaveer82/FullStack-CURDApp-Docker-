import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);

export default app;