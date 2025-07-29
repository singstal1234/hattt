import { Buffer } from "buffer";
import { beginCell } from "@ton/core";

export const messageToPayload = (message) => {
  const buf = Buffer.from(new TextEncoder().encode(message)); // создаём Buffer
  const payloadCell = beginCell().storeBuffer(buf).endCell();

  const payloadBase64 = payloadCell.toBoc().toString("base64");
  console.log(payloadBase64);
  return payloadBase64;
};
