const express = require("express");
const app = express();
const PORT = 3000; 

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Color Buttons</title>
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.3s ease;
        }

        .buttons {
          display: flex;
          gap: 15px;
        }

        button {
          padding: 15px 30px;
          font-size: 18px;
          cursor: pointer;
          border: none;
          border-radius: 8px;
          color: white;
        }

        .yellow { background-color: goldenrod; }
        .brown { background-color: brown; }
        .red { background-color: red; }
      </style>
    </head>
    <body>
      <div class="buttons">
        <button class="yellow" onclick="changeColor('goldenrod')">Yellow</button>
        <button class="brown" onclick="changeColor('brown')">Brown</button>
        <button class="red" onclick="changeColor('red')">Red</button>
      </div>

      <script>
        function changeColor(color) {
          document.body.style.backgroundColor = color;
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

