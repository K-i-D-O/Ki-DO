module.exports = {
  apps: [
    {
      name: "kido",
      cwd: process.env.WORKSPACE_ROOT_CWD,
      script: "npm",
      args: "start -- --port 3002",
      instances: 1,
      exec_mode: "fork",
    },
  ],
};
