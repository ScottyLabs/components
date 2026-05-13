{ mkBunDerivation, ... }:

# Starlight docs site built via bun2nix for kennel deployment.
mkBunDerivation {
  pname = "docs";
  version = "0.0.0";

  src = ../.;
  bunNix = ../bun.nix;
  packageJson = ../package.json;

  buildPhase = ''
    runHook preBuild
    bun run --filter '@scottylabs/docs' build
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    mkdir -p $out
    cp -r apps/docs/dist/. $out/
    runHook postInstall
  '';
}
