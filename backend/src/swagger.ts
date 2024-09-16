//@ts-nocheck
import swaggerAutogen from "swagger-autogen";

swaggerAutogen({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "DevvoRing API",
    description: "Playground for DevvoRing Api...",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
  components: {
    schemas: {
      someBody: {
        $name: "Jhon Doe",
        $age: 29,
        about: "",
      },
      someResponse: {
        name: "Jhon Doe",
        age: 29,
        diplomas: [
          {
            school: "XYZ University",
            year: 2020,
            completed: true,
            internship: {
              hours: 290,
              location: "XYZ Company",
            },
          },
        ],
      },
      someEnum: {
        "@enum": ["red", "yellow", "green"],
      },
    },
  },
};

const outputFile = "./src/swagger-output.json";
const endpointsFiles = ["./src/routes/ringRoutes.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.ts"); // Your project's root file
});
