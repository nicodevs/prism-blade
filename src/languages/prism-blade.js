import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-php';

const phpInside = Prism.languages.php;
const { markup, css, javascript } = Prism.languages;

const bladeEchoPatterns = {
  'blade-echo-unescaped': {
    pattern: /\{!!\s*[\s\S]*?\s*!!\}/,
    greedy: true,
    alias: 'variable',
    inside: {
      'symbol': {
        pattern: /^\{!!|!!\}$/,
        alias: 'symbol'
      },
      rest: phpInside
    }
  },
  'blade-echo-escaped': {
    pattern: /\{\{\s*[\s\S]*?\s*\}\}/,
    greedy: true,
    alias: 'variable',
    inside: {
      'symbol': {
        pattern: /^\{\{|\}\}$/,
        alias: 'symbol'
      },
      rest: phpInside
    }
  }
};

function createBlockPattern (tagName, language) {
  return {
    pattern: new RegExp(`<${tagName}[\\s\\S]*?>[\\s\\S]*?<\\/${tagName}>`, 'i'),
    inside: {
      'tag': markup.tag,
      [`${tagName}-content`]: {
        pattern: new RegExp(`(<${tagName}[\\s\\S]*?>)[\\s\\S]*?(?=<\\/${tagName}>)`, 'i'),
        lookbehind: true,
        inside: {
          ...language,
          ...bladeEchoPatterns
        }
      }
    }
  };
};

function nonBladeMarkup(obj) {
  const clone = structuredClone(obj);

  Prism.languages.DFS(clone, (key, value) => {
    if (value && typeof value === 'object' && value.inside) {
      value._skipBlade = true;
    }
  });

  return clone;
}

Prism.languages.blade = Prism.languages.extend('markup', {
  verbatim: {
    _skipBlade: true,
    pattern: /@verbatim[\s\S]*?@endverbatim/,
    greedy: true,
    inside: {
      'keyword': {
        pattern: /^@verbatim|@endverbatim$/,
        alias: 'keyword'
      },
      'verbatim-content': {
        _skipBlade: true,
        pattern: /[\s\S]+/,
        inside: {
          rest: nonBladeMarkup(markup)
        },
      }
    }
  },

  'comment': [
    {
      pattern: /\{\{--[\s\S]*?--\}\}/,
      greedy: true
    },
    {
      pattern: /<!--[\s\S]*?-->/,
      greedy: true
    }
  ],

  'php-block': {
    pattern: /@php\b[\s\S]*?@endphp\b/,
    greedy: true,
    inside: {
      'php-start': {
        pattern: /^@php\b/,
        alias: 'keyword'
      },
      'php-end': {
        pattern: /@endphp\b$/,
        alias: 'keyword'
      },
      'php-content': {
        pattern: /[\s\S]+/,
        inside: phpInside
      }
    }
  },

  ...bladeEchoPatterns,

  'blade-directive-with-params': {
    pattern: /@[a-zA-Z_][a-zA-Z0-9_]*\s*\((?:[^()]|\([^()]*\))*\)/,
    inside: {
      'directive-name': {
        pattern: /^@[a-zA-Z_][a-zA-Z0-9_]*/,
        alias: 'keyword'
      },
      'directive-params': {
        pattern: /\(([\s\S]*)\)/,
        inside: phpInside
      }
    }
  },

  'blade-directive': {
    pattern: /@[a-zA-Z_][a-zA-Z0-9_]*/,
    alias: 'keyword'
  },

  'style-block': createBlockPattern('style', css),
  'script-block': createBlockPattern('script', javascript),

  'tag': {
    pattern: markup.tag.pattern,
    inside: {
      ...markup.tag.inside,
      'special-attr': [
        // Dynamic (colon-prefixed) attribute: :foo="php"
        {
          pattern: /(:[\w:-]+)=("[^"]*"|'[^']*'|[^\s'"=<>`]+)/,
          inside: {
            'attr-name': /^:[\w:-]+/,
            'punctuation': /=/,
            'attr-value': {
              pattern: /("[^"]*"|'[^']*'|[^\s'"=<>`]+)$/,
              inside: {
                'string': {
                  pattern: /^(["'])(.*)\1$/,
                  inside: {
                    'punctuation': /^["']|["']$/,
                    'php-content': {
                      pattern: /.+/,
                      inside: phpInside
                    }
                  }
                },
                'unquoted': {
                  pattern: /^[^\s'"=<>`]+$/,
                  inside: phpInside
                }
              }
            }
          }
        },
        // Standard attribute with possible Blade echos: foo="{{ ... }}"
        {
          pattern: /([\w:-]+)=("[^"]*"|'[^']*'|[^\s'"=<>`]+)/,
          inside: {
            'attr-name': /^[\w:-]+/,
            'punctuation': /=/,
            'attr-value': {
              pattern: /("[^"]*"|'[^']*'|[^\s'"=<>`]+)$/,
              inside: {
                'punctuation': /^["']|["']$/,
                ...bladeEchoPatterns,
                rest: phpInside
              }
            }
          }
        }
      ]
    }
  },

  'doctype': {
    pattern: /<!DOCTYPE[\s\S]+?>/i,
    greedy: true,
    inside: {
      'doctype-tag': /^<!DOCTYPE/i,
      'punctuation': /[<>]/
    }
  },

  'entity': /&#?[\da-z]{1,8};/i
});

// Recursively inject Blade echo patterns
Prism.languages.DFS(Prism.languages.blade, (key, def) => {
  if (
    def &&
    typeof def === 'object' &&
    def.inside &&
    !def._skipBlade &&
    !def.inside['blade-echo-escaped'] &&
    !def.inside['blade-echo-unescaped']
  ) {
    def.inside['blade-echo-escaped'] = bladeEchoPatterns['blade-echo-escaped'];
    def.inside['blade-echo-unescaped'] = bladeEchoPatterns['blade-echo-unescaped'];
  }
});

const prismBlade = Prism.languages.blade;

export { prismBlade as default };
