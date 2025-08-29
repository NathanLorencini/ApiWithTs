import { server } from "./server/server";
import dotenv from "dotenv";
dotenv.config();

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
