{ inputs, ... }:

{
  imports = [ inputs.scottylabs.devenvModules.default ];

  scottylabs = {
    enable = true;
    project.name = "components";

    bun.enable = true;

    kennel.sites = {
      docs = {
        spa = false;
        customDomain = "components.scottylabs.org";
      };
      storybook = {
        spa = true;
        customDomain = "storybook.scottylabs.org";
      };
      storybook-react = {
        spa = true;
        customDomain = "react.storybook.scottylabs.org";
      };
      storybook-svelte = {
        spa = true;
        customDomain = "svelte.storybook.scottylabs.org";
      };
    };
  };
}
