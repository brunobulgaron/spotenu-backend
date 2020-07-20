import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { userRouter } from './router/UserRouter';
import { bandRouter } from "./router/BandRouter";
import { genreRouter } from "./router/GenreRouter";
import { albumRouter } from "./router/AlbumRouter";
import { songRouter } from "./router/SongRouter";

dotenv.config();

let cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/band", bandRouter);
app.use("/genre", genreRouter);
app.use("/album", albumRouter);
app.use("/song", songRouter);

const server = app.listen(process.env.PORT || 5000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
