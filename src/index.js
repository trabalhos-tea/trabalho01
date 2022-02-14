const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, () => console.log(`Server running at port ${port}`));
