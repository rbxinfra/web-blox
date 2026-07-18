import {
  serve
} from "bun";
import {
  join,
  resolve
} from 'node:path';
import {
  parseArgs
} from "util";

const {
  values: {
    root: rootValue,
    port: portValue
  }
} = parseArgs({
  args: Bun.argv,
  options: {
    root: {
      type: "string",
      default: __dirname
    },
    port: {
      type: 'string',
      default: '3001'
    }
  },
  strict: true,
  allowPositionals: true
});

const root = resolve(rootValue);

let port = parseInt(portValue);
if (isNaN(port)) port = 3001;

console.log(`Serving storybook from ${root} on port ${port}`);

serve({
  port,
  async fetch(request) {
    let path = new URL(request.url).pathname;
    if (path.endsWith('/')) path += 'index.html';

    const filePath = join(root, path);

    const file = Bun.file(filePath);

    console.log(`${request.method} to ${path} -> ${filePath}`)

    return (await file.exists()) ?
      new Response(file) :
      new Response('not found', () => ({
        status: 404,
        headers: {
          'content-type': 'text/plain'
        }
      }));
  }
});