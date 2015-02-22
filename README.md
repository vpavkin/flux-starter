#Flux App Starter
> A starter project for a React Flux app with ImmutableJS, RxJS, ReactBootstrap.
> Allows ES6 syntax via BabelJS transpiler.

## Install dependencies:
```bash
npm install
```

## Dev server:
```bash
grunt dev-server
```

For Livereload to work you'll need chrome extension and this:
```bash
grunt watch
```

## Watch
Recompiles styles, and runs `jshint` and `jscs` on file change.
```bash
grunt watch
```

## Production version build and run:
```bash
grunt
cd build
python -m SimpleHTTPServer
```

## Testing
Once
```bash
grunt karma:once
```

Rerun on change
```
grunt karma:unit
```

##Pre-commit hooks
Hooks installed: `jshint`, `jscs`.

You can run hook in the console by:
```bash
grunt precommit
```
or watch it by
```bash
grunt watch
```


