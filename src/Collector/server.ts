import app from "./src/app";
import { sendData_Estacoes } from "../Simulator/source";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    {/*mongoProPrisma()*/};
}).on('error', (err) => {
    console.error(`Failed to start server on port ${PORT}:`, err);
});