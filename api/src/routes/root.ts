import type { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    throw new Error("Se nos va el tiempo. Andá a la documentación.");
  });
};

export default root;
