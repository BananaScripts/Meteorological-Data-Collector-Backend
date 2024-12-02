import app from "./app";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error(`Failed to start server on port ${PORT}:`, err);
});