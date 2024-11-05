import app from "./src/app";
import { sendData_Estacoes } from "../Simulator/source";

const port = process.env.PORT || 30015;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  {/*mongoProPrisma()*/};
});
