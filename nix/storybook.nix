{ mkBunDerivation, ... }:

# Storybook composition host built via bun2nix for kennel deployment.
# Passes the deployed React/Svelte Storybook URLs to the build as env vars.
mkBunDerivation {
  pname = "storybook";
  version = "0.0.0";

  src = ../.;
  bunNix = ../bun.nix;
  packageJson = ../package.json;

  SB_REACT_URL = "https://react.storybook.scottylabs.org";
  SB_SVELTE_URL = "https://svelte.storybook.scottylabs.org";

  buildPhase = ''
    runHook preBuild
    bun run --filter '@scottylabs/storybook' build
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    mkdir -p $out
    cp -r apps/storybook/storybook-static/. $out/
    runHook postInstall
  '';
}
