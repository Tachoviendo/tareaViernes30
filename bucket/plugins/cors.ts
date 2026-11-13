import type { FastifyCorsOptions } from "@fastify/cors";
import fp from "fastify-plugin";

import cors from "@fastify/cors";

export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(cors, {
    origin: ["http://localhost:4200", "http://misitio.com", "http://10.4.201.58:4200", "http://localhost", "capacitor://localhost"],
    methods: "GET, POST",
  });
});
