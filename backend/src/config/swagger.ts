import path from "path";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const swaggerFile = path.join(__dirname, "../swagger.yaml");

const swaggerDocument = YAML.load(swaggerFile);

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

export { swaggerUi, swaggerDocument as swaggerSpec, swaggerUiOptions };
