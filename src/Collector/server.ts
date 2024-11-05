import app from "./app";
import { sendData_Estacoes } from "../Simulator/source";
import { mongoProPrisma } from "./source/mongoProPrisma";

const port = process.env.PORT || 30015;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  mongoProPrisma();
});
