#!/usr/bin/env node
import { program } from "commander";
import { pushCommand } from "../src/commands/push.js";
import { pullCommand } from "../src/commands/pull.js";
import { loginCommand, logoutCommand } from "../src/commands/auth.js";
import { runCommand } from "../src/commands/run.js";

program
  .name("keydrop")
  .description("Turn your .env into one deployable key")
  .version("1.2.0");

program.command("login").description("Login to KeyDrop").action(loginCommand);
program.command("logout").description("Logout from KeyDrop").action(logoutCommand);
program.command("push").description("Upload .env and get KEYDROP_KEY").action(pushCommand);
program.command("pull").description("Restore secrets from KEYDROP_KEY").action(pullCommand);

program
  .command("run [args...]")
  .description("Run a command with secrets injected")
  .allowUnknownOption()
  .action((args, options, cmd) => {
    const allArgs = cmd.args;
    runCommand(allArgs);
  });

program.parse();