#!/usr/bin/env node
import { Command } from 'commander';
import { generateFeature } from './generators/featur.generator.js';
import { generateEntity } from './generators/entiti.generator.js';

const program = new Command();

program
  .name('cli')
  .description('CLI para generar features y entities en arquitectura limpia')
  .version('1.0.0');

program
  .command('generate:feature <name>')
  .description('Genera un nuevo feature sin persistencia en DB')
  .action((name) => {
    generateFeature(name);
  });

program
  .command('generate:entity <name>')
  .description('Genera una nueva entity con persistencia en DB')
  .action((name) => {
    generateEntity(name);
  });

program.parse(process.argv);

