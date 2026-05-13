{ mkBunDerivation, ... }:

# Svelte Storybook static site built via bun2nix for kennel deployment.
mkBunDerivation {
  pname = "storybook-svelte";
  version = "0.0.0";

  src = ../.;
  bunNix = ../bun.nix;
  packageJson = ../package.json;

  buildPhase = ''
    runHook preBuild
    bun run --filter '@scottylabs/storybook-svelte' build
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    mkdir -p $out
    cp -r apps/storybook-svelte/storybook-static/. $out/
    runHook postInstall
  '';
}
