// Transforms the Tokenhaus DTCG export into the shape Terrazzo 2.x expects:
//
// 1. Modes inline as `$value: { Light: ..., Dark: ... }` become DTCG `$extensions.mode.<mode>`
//    with the default mode (Light) in `$value`.
// 2. Hex string colors ("#0e96d1") become object form ({colorSpace, components, alpha}).
// 3. Token paths are renamed to kebab-case to satisfy Terrazzo's core/consistent-naming rule,
//    including alias references like `{Primitives.Blue (Brand).500}` ->
//    `{primitives.blue-brand.500}`. Keys under `$value` and `$extensions` are preserved
//    verbatim since those positions hold data, not token paths.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type Json = string | number | boolean | null | Json[] | JsonObject;
interface JsonObject {
  [key: string]: Json;
}

interface Token extends JsonObject {
  $type: Json;
  $value: Json;
}

const root = fileURLToPath(new URL("..", import.meta.url));
const inputPath = resolve(root, "figma-export.json");
const outputPath = resolve(root, "tokens/colors.generated.json");

const DEFAULT_MODE = "Light";

function isObject(value: Json | undefined): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isToken(node: Json): node is Token {
  return isObject(node) && "$type" in node && "$value" in node;
}

function hasModeShape(value: Json): value is JsonObject {
  return isObject(value) && (DEFAULT_MODE in value || "Dark" in value);
}

function isAlias(value: Json | undefined): value is string {
  return typeof value === "string" && value.startsWith("{") && value.endsWith("}");
}

function isHexColor(value: Json | undefined): value is string {
  return typeof value === "string" && /^#[0-9a-fA-F]{3,8}$/u.test(value);
}

function toKebab(s: string): string {
  return s
    .replaceAll(/\(([^)]*)\)/gu, "-$1")
    .replaceAll(/[A-Z]+/gu, (m: string, offset: number) =>
      offset === 0 ? m.toLowerCase() : `-${m.toLowerCase()}`,
    )
    .replaceAll(/[\s_]+/gu, "-")
    .replaceAll(/-+/gu, "-")
    .replaceAll(/^-|-$/gu, "")
    .toLowerCase();
}

function round(n: number): number {
  return Math.round(n * 10000) / 10000;
}

function hexToColorObject(hex: string): JsonObject {
  let body = hex.slice(1);
  if (body.length === 3) {
    body = body.replaceAll(/./gu, (c) => c + c);
  }
  if (body.length === 6) body += "ff";
  if (body.length !== 8) {
    throw new Error(`Unsupported hex color: ${hex}`);
  }

  const channel = (start: number) => Number.parseInt(body.slice(start, start + 2), 16) / 255;
  return {
    colorSpace: "srgb",
    components: [round(channel(0)), round(channel(2)), round(channel(4))],
    alpha: round(channel(6)),
  };
}

function rewriteAlias(value: Json): Json {
  if (!isAlias(value)) return value;
  const inner = value.slice(1, -1);
  return `{${inner
    .split(".")
    .map((part) => toKebab(part))
    .join(".")}}`;
}

function normalizeColorValue(value: Json | undefined): Json {
  if (value === undefined) return null;
  if (isAlias(value)) return rewriteAlias(value);
  if (isHexColor(value)) return hexToColorObject(value);
  return value;
}

function transformToken(node: JsonObject): JsonObject {
  if (isToken(node) && hasModeShape(node.$value)) {
    const { [DEFAULT_MODE]: defaultValue, ...otherModes } = node.$value;
    const isColor = node.$type === "color";
    const transformedDefault = isColor ? normalizeColorValue(defaultValue) : (defaultValue ?? null);
    const transformedOther: JsonObject = isColor
      ? Object.fromEntries(
          Object.entries(otherModes).map(([mode, value]) => [mode, normalizeColorValue(value)]),
        )
      : otherModes;
    const existingExt = isObject(node["$extensions"]) ? node["$extensions"] : {};
    const existingModes = isObject(existingExt["mode"]) ? existingExt["mode"] : {};
    return {
      ...node,
      $value: transformedDefault,
      $extensions: {
        ...existingExt,
        mode: { ...existingModes, ...transformedOther },
      },
    };
  }

  if (isToken(node) && node.$type === "color") {
    return { ...node, $value: normalizeColorValue(node.$value) };
  }

  return node;
}

function walkAndRename(node: Json, inExtensions = false, inValue = false): Json {
  if (typeof node === "string") {
    return inExtensions || inValue ? node : rewriteAlias(node);
  }
  if (Array.isArray(node)) return node.map((n) => walkAndRename(n, inExtensions, inValue));
  if (!isObject(node)) return node;

  const transformedNode = inExtensions || inValue ? node : transformToken(node);

  const out: JsonObject = {};
  for (const [key, value] of Object.entries(transformedNode)) {
    const isMeta = key.startsWith("$");
    const skipRename = inExtensions || inValue || isMeta;
    const newKey = skipRename ? key : toKebab(key);
    const childInExt = inExtensions || key === "$extensions";
    const childInValue = inValue || key === "$value";
    out[newKey] = walkAndRename(value, childInExt, childInValue);
  }
  return out;
}

function isJson(value: unknown): value is Json {
  if (value === null || ["string", "number", "boolean"].includes(typeof value)) return true;
  if (Array.isArray(value)) return value.every((item) => isJson(item));
  return typeof value === "object" && Object.values(value).every((item) => isJson(item));
}

const input: unknown = JSON.parse(readFileSync(inputPath, "utf8"));
if (!isJson(input)) throw new Error(`${inputPath} is not JSON`);
const output = walkAndRename(input);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(output, null, 4)}\n`);

console.log(`Transformed ${inputPath} -> ${outputPath}`);
