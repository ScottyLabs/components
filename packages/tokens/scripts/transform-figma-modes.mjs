// Tokenhaus exports modes inline as `$value: { Light: ..., Dark: ... }`, but Terrazzo 2.x
// expects W3C DTCG modes under `$extensions.mode.<mode-name>` with the default in `$value`.
// This script rewrites the Tokenhaus shape into the spec-compliant shape so Terrazzo can build.

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
        (DEFAULT_MODE in value || Object.keys(value).some((k) => k === "Dark"))
    );
}

function transform(node) {
    if (node === null || typeof node !== "object") return node;
    if (Array.isArray(node)) return node.map(transform);

    if (isToken(node) && hasModeShape(node.$value)) {
        const modes = node.$value;
        const { [DEFAULT_MODE]: defaultValue, ...otherModes } = modes;
        const next = { ...node, $value: defaultValue };
        const existingExt = node.$extensions ?? {};
        next.$extensions = {
            ...existingExt,
            mode: { ...(existingExt.mode ?? {}), ...otherModes },
        };
        return next;
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
