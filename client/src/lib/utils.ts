import { Buffer } from 'buffer';

const convertDataToFile = (data, name) => {
   let buffer = Buffer.from(data);
   let arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
   let file = new File([arrayBuffer], name + '.pdf', {
      type: 'application/pdf'
   });
   return file;
}

export { convertDataToFile }