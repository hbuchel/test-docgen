#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const minimist = require('minimist');
const chalk = require('chalk');
const docgen = require('react-docgen');
const parse = require('react-docgen').parse;
const chokidar = require('chokidar');

module.exports = () => {
  // Get arguments passed to the module
  const args = minimist(process.argv.slice(2))
  console.log(args);

  
  // Return an error if the --dir argument is not supplied.
  if (!args.dir) {
    console.log("Supply a --dir flag to set the src dirctory of your components.");
    return;
  }

  // Setup paths based on arguments passed
  const paths = {
    components: path.join(process.cwd(), args.dir),
    data: './src/data/component.js',
    output: args.output ? path.join(process.cwd(), args.output) : path.join(process.cwd(), '/dist/docs')
  }

  
  if (args.watch) {
    // Regenerate component metadata when components or examples change.
    chokidar.watch([paths.components]).on('change', function(event, path) {

      generate(paths);
    });
  } else {
    // Generate component metadata
    generate(paths);
  }

  generate(paths);

  function generate(paths) {
    var errors = [];
  
    var data = getDirectories(paths.components).map(function(componentName) {
      try {
        return getComponentData(paths, componentName);
      } catch(error) {
        errors.push('An error occurred while attempting to generate metadata for ' + componentName + '. ' + error);
      }
    });
    writeFile(paths.data, "module.exports = /* eslint-disable */ " + JSON.stringify(errors.length ? errors : data));
  }

  function getComponentData(paths, componentName) {
    var content = readFile(path.join(paths.components, componentName, componentName + '.js'));
  
    var info = parse(content);
    var doclets = docgen.utils.docblock.getDoclets(info.description);
  
    return {
      name: componentName,
      description: doclets.desc,
      category: doclets.category,
      RTL: doclets.RTL,
      props: info.props,
      code: content
    }
  }

  function getDirectories(filepath) {
    return fs.readdirSync(filepath).filter(function(file) {
      return fs.statSync(path.join(filepath, file)).isDirectory();
    });
  }

  function writeFile(filepath, content) {
    fs.writeFile(filepath, content, function (err) {
      err ? console.log(chalk.red(err)) : console.log(chalk.green("Component data saved."));
    });
  }

  function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  
}



