# @scottylabs/storybook

This app is the Storybook composition host. It has no stories of its own, but it pulls the React and Svelte Storybooks via Storybook's `refs` configuration so they share a single navigable sidebar.

The refs are read from `SB_REACT_URL` and `SB_SVELTE_URL` (which default to `http://localhost:6007` and `http://localhost:6008` respectively), and the deployed build bakes in `react.storybook.scottylabs.org` and `svelte.storybook.scottylabs.org`.

For the React and Svelte versions of a component to appear adjacent in the composed sidebar, their stories need the same `title`, such as `Components/Button`.
