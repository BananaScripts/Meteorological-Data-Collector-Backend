import app from "./source/app";

const port = process.env.PORT || 3080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});