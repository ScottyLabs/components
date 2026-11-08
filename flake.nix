{
  description = "ScottyLabs design tokens and components";

  nixConfig = {
    extra-substituters = [ "https://scottylabs.cachix.org" ];
    extra-trusted-public-keys = [
      "scottylabs.cachix.org-1:hajjEX5SLi/Y7yYloiXTt2IOr3towcTGRhMh1vu6Tjg="
    ];
  };

  inputs = {
    scottylabs.url = "git+https://git.cmu.dev/ScottyLabs/kennel";
    nixpkgs.follows = "scottylabs/nixpkgs";
    flake-parts.follows = "scottylabs/flake-parts";
  };

  outputs =
    inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ inputs.scottylabs.flakeModules.default ];
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];

      perSystem =
        {
          pkgs,
          lib,
          helpers,
          ...
        }:
        let
          site =
            name: output:
            helpers.buildDenoTask {
              src = ./.;
              pname = name;
              version = "0.0.0";
              task = "build:${name}";
              output = "apps/${name}/${output}";
            };

          storybook = port: name: {
            run = "cd apps/${name} && deno task dev";
            ready = "${lib.getExe pkgs.curl} -sf http://localhost:${toString port}";
            depends = [ "packages" ];
          };
        in
        {
          scottylabs = {
            project.name = "components";

            deno = {
              enable = true;
              react.enable = true;
            };

            # the apps type-check against each package's built dist
            hooksCheck.setup = lib.mkAfter "deno task build";

            processes = {
              packages = {
                run = "deno task build";
                oneshot = true;
              };
              docs = {
                run = "cd apps/docs && deno task dev";
                ready = "${lib.getExe pkgs.curl} -sf http://localhost:4321";
                depends = [ "packages" ];
              };
              storybook = storybook 6006 "storybook";
              storybook-react = storybook 6007 "storybook-react";
              storybook-svelte = storybook 6008 "storybook-svelte";
            };
          };

          sites = {
            docs = {
              package = site "docs" "dist";
              customDomain = "components.scottylabs.org";
            };
            storybook = {
              package = (site "storybook" "storybook-static").overrideAttrs {
                SB_REACT_URL = "https://react.storybook.scottylabs.org";
                SB_SVELTE_URL = "https://svelte.storybook.scottylabs.org";
              };
              customDomain = "storybook.scottylabs.org";
              spa = true;
            };
            storybook-react = {
              package = site "storybook-react" "storybook-static";
              customDomain = "react.storybook.scottylabs.org";
              spa = true;
            };
            storybook-svelte = {
              package = site "storybook-svelte" "storybook-static";
              customDomain = "svelte.storybook.scottylabs.org";
              spa = true;
            };
          };
        };
    };
}
