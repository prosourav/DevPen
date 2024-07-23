export type LanguageCode = typeof languages[number];

export type CodeSnippet = {
  readonly code: string;
};

type LangType = Readonly<Record<LanguageCode, CodeSnippet>>;

export const languages = ['c++', 'js', 'java', 'python'] as const;

export const lang: LangType = {
  'c++': {
    code: `#include <iostream>
    using namespace std;

    int main() {
      cout << "Hello World!";
      return 0;
    }`
  },

  'js': {
    code: `console.log('hello world')`
  },

  'java': {
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
  }`
  },

  'python': {
    code: `print('Hello World!')`
  },
} as const;


export const initialData = {
  Basics: {
    'Hello JS': {
      uuid: 'Basics-Hello JS',
      language: 'js',
      code: lang['js'].code,
    },
    'Hello C++': {
      uuid: 'Basics-Hello C++',
      language: 'c++',
      code: lang['c++'].code,
    },
    'Hello Python': {
      uuid: 'Basics-Hello Python',
      language: 'python',
      code: lang['python'].code,
    },
    'Hello Java': {
      uuid: 'Basics-Hello Java',
      language: 'java',
      code: lang['java'].code,
    },
  }
};





