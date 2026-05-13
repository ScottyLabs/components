// Tokenhaus exports modes inline as `$value: { Light: ..., Dark: ... }` and stores colors as
// hex strings like "#0e96d1", but Terrazzo 2.x expects W3C DTCG modes under
// `$extensions.mode.<mode-name>` with the default in `$value`, and colors in object notation
// `{ colorSpace: "srgb", components: [r, g, b], alpha }`. This script rewrites both shapes
// so the strict Terrazzo lint rules (core/valid-color, core/valid-dimension, core/valid-number)
// stay enabled.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
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

function normalizeColorValue(value) {
    if (isAlias(value)) return value;
    if (isHexColor(value)) return hexToColorObject(value);
    return value;
}

function transform(node) {
    if (node === null || typeof node !== "object") return node;
    if (Array.isArray(node)) return node.map(transform);

    if (isToken(node) && hasModeShape(node.$value)) {
        const modes = node.$value;
        const { [DEFAULT_MODE]: defaultValue, ...otherModes } = modes;
        const isColor = node.$type === "color";
        const next = {
            ...node,
            $value: isColor ? normalizeColorValue(defaultValue) : defaultValue,
        };
        const existingExt = node.$extensions ?? {};
        const transformedOtherModes = isColor
            ? Object.fromEntries(
                  Object.entries(otherModes).map(([mode, modeValue]) => [
                      mode,
                      normalizeColorValue(modeValue),
                  ]),
              )
            : otherModes;
        next.$extensions = {
            ...existingExt,
            mode: { ...existingExt.mode, ...transformedOtherModes },
        };
        return next;
    }

    if (isToken(node) && node.$type === "color") {
        return { ...node, $value: normalizeColorValue(node.$value) };
    }

    const out = {};
    for (const [k, v] of Object.entries(node)) {
        out[k] = transform(v);
    }
    return out;
}

const input = JSON.parse(readFileSync(inputPath, "utf8"));
const output = transform(input);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(output, null, 4)}\n`);

console.log(`Transformed ${inputPath} -> ${outputPath}`);
