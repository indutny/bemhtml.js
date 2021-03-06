var bemhtml = exports;

// Runtime
bemhtml.runtime = require('./bemhtml/runtime');

// i-bem
bemhtml.ibem = require('./bemhtml/i-bem');

// Compiler
bemhtml.Compiler = require('./bemhtml/compiler').Compiler;

// API functions
bemhtml.translate = require('./bemhtml/api').translate;
bemhtml.generate = require('./bemhtml/api').generate;
bemhtml.compile = require('./bemhtml/api').compile;
