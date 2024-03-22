export const codeEvent = {
  id: "85a6e8d1fb8e733bb4ac75c5e07ad008c6c63f5eb01399b00b3058511f508a6b",
  pubkey: "8eccb67e6f9c1460cf5877112e6140a922473d5ee2a993431df3632ed6299b5c",
  created_at: 1710969837,
  kind: 30189,
  tags: [],
  content: "return { hello: 'world' };",
  sig: "69e03489bcc21a2b1bd5fb4aede566c203e8a7b50f37bf6f8e3b2a317bb2f98327940592fd04f43d7bf2bf63c14d0832b8804ccd6e56d4fe21bf50b251e8567d",
};

export const repoManifest = {
  id: "62f88d71b1a96920b441fbbaf9c1e9f0784a6965cf44a8a1e450ce8684c8447f",
  pubkey: "8eccb67e6f9c1460cf5877112e6140a922473d5ee2a993431df3632ed6299b5c",
  created_at: 1710972633,
  kind: 30188,
  tags: [
    ["d", "repo:lottery"],
    ["version:0.5.0", codeEvent.id],
    ["description", "Repo Description"],
  ],
  content: "Lottery and Halve",
  sig: "e0d41b9c1d0b67f7821db05d80229fef7ed3f8394d590918a67992e757eb2430787bfe727e49878ab5ad133f49f004e0549b530afb5a6970df26d6eabf9a164f",
};
