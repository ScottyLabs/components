{ pkgs, inputs, ... }:

let
  mkBunDerivation = inputs.bun2nix.lib.${pkgs.system}.mkBunDerivation;
  docs = pkgs.callPackage ./nix/docs.nix { inherit mkBunDerivation; };
  storybook = pkgs.callPackage ./nix/storybook.nix { inherit mkBunDerivation; };
  storybook-react = pkgs.callPackage ./nix/storybook-react.nix { inherit mkBunDerivation; };
  storybook-svelte = pkgs.callPackage ./nix/storybook-svelte.nix { inherit mkBunDerivation; };
in
{
  imports = [ inputs.scottylabs.devenvModules.default ];

  scottylabs = {
    enable = true;
    project.name = "components";

    bun.enable = true;

    kennel.sites = {
      docs = {
        spa = false;
        customDomain = "docs.components.scottylabs.org";
      };
      storybook = {
        spa = true;
        customDomain = "components.components.scottylabs.org";
      };
      storybook-react = {
        spa = true;
        customDomain = "react.components.scottylabs.org";
      };
      storybook-svelte = {
        spa = true;
        customDomain = "svelte.components.scottylabs.org";
      };
    };
  };

  packages = [
    inputs.bun2nix.packages.${pkgs.system}.default
  ];

  outputs = {
    inherit docs storybook storybook-react storybook-svelte;
  };
}
