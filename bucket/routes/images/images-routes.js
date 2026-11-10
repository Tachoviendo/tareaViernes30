import path from "node:path";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { pipeline } from "node:stream/promises";

export default async function (fastify, opts) {
  fastify.post("/", {
    handler: async function (request, reply) {
      console.log("HANDLER");
      // process a single file
      // also, consider that if you allow to upload multiple files
      // you must consume all files otherwise the promise will never fulfill
      const data = await request.file();

      if (!data) {
        return reply
          .code(400)
          .status(400)
          .send({ error: "No se ha proporcionado ninguna imagen." });
      }

      if (!data.mimetype.startsWith("image/")) {
        return reply
          .code(400)
          .send({ error: "El archivo debe ser una imagen válida." });
      }

      // data.file; // stream
      // data.fields; // other parsed parts
      // data.fieldname;
      // data.filename;
      // data.encoding;
      // data.mimetype;

      // to accumulate the file in memory! Be careful!
      //
      // await data.toBuffer() // Buffer
      //
      // or

      const extension = path.extname(data.filename);
      const safeFilename = `${randomUUID()}${extension}`;

      const destinationPath = path.join(
        process.cwd(),
        "public",
        "images",
        safeFilename,
      );
      console.log({ destinationPath });
      await pipeline(data.file, fs.createWriteStream(destinationPath));

      // be careful of permission issues on disk and not overwrite
      // sensitive files that could cause security risks

      // also, consider that if the file stream is not consumed, the promise will never fulfill

      reply.send({
        message: "Imagen subida con éxito",
        filename: safeFilename,
        url: `${safeFilename}`,
      });
    },
  });
}
