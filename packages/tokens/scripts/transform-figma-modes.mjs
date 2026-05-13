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

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const inputPath = resolve(root, "figma-export.json");
const outputPath = resolve(root, "tokens/colors.generated.json");

const DEFAULT_MODE = "Light";

function isToken(node) {
    return node && typeof node === "object" && "$type" in node && "$value" in node;
}

function hasModeShape(value) {
    return (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        (DEFAULT_MODE in value || "Dark" in value)
    );
}

function isAlias(value) {
    return typeof value === "string" && value.startsWith("{") && value.endsWith("}");
}

function isHexColor(value) {
    return typeof value === "string" && /^#[0-9a-fA-F]{3,8}$/.test(value);
}

function toKebab(s) {
    return s
        .replace(/\(([^)]*)\)/g, "-$1")
        .replace(/[A-Z]+/g, (m, offset) => (offset === 0 ? m.toLowerCase() : `-${m.toLowerCase()}`))
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
}

function hexToColorObject(hex) {
    let body = hex.slice(1);
    if (body.length === 3) {
        body = body
            .split("")
            .map((c) => c + c)
            .join("");
    }
    if (body.length === 6) body += "ff";
    if (body.length !== 8) {
        throw new Error(`Unsupported hex color: ${hex}`);
    }
    const r = Number.parseInt(body.slice(0, 2), 16) / 255;
    const g = Number.parseInt(body.slice(2, 4), 16) / 255;
    const b = Number.parseInt(body.slice(4, 6), 16) / 255;
    const alpha = Number.parseInt(body.slice(6, 8), 16) / 255;
    return {
        colorSpace: "srgb",
        components: [round(r), round(g), round(b)],
        alpha: round(alpha),
    };
}

function round(n) {
    return Math.round(n * 10000) / 10000;
}

function rewriteAlias(value) {
    if (!isAlias(value)) return value;
    const inner = value.slice(1, -1);
    return `{${inner.split(".").map(toKebab).join(".")}}`;
}

function normalizeColorValue(value) {
    if (isAlias(value)) return rewriteAlias(value);
    if (isHexColor(value)) return hexToColorObject(value);
    return value;
}

function transformToken(node) {
    if (isToken(node) && hasModeShape(node.$value)) {
        const modes = node.$value;
        const { [DEFAULT_MODE]: defaultValue, ...otherModes } = modes;
        const isColor = node.$type === "color";
        const transformedDefault = isColor ? normalizeColorValue(defaultValue) : defaultValue;
        const transformedOther = isColor
            ? Object.fromEntries(
                  Object.entries(otherModes).map(([m, v]) => [m, normalizeColorValue(v)]),
              )
            : otherModes;
        const existingExt = node.$extensions ?? {};
        return {
            ...node,
            $value: transformedDefault,
            $extensions: {
                ...existingExt,
                mode: { ...existingExt.mode, ...transformedOther },
            },
        };
    }

    if (isToken(node) && node.$type === "color") {
        return { ...node, $value: normalizeColorValue(node.$value) };
    }

    return node;
}

function walkAndRename(node, inExtensions = false, inValue = false) {
    if (typeof node === "string") {
        return inExtensions || inValue ? node : rewriteAlias(node);
    }
    if (node === null || typeof node !== "object") return node;
    if (Array.isArray(node)) return node.map((n) => walkAndRename(n, inExtensions, inValue));

    const transformedNode = inExtensions || inValue ? node : transformToken(node);

    const out = {};
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

const input = JSON.parse(readFileSync(inputPath, "utf8"));
const output = walkAndRename(input);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(output, null, 4)}\n`);

console.log(`Transformed ${inputPath} -> ${outputPath}`);
