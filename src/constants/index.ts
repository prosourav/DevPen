type LanguageCode = 'c++' | 'js' | 'java' | 'python';

type CodeSnippet = {
  readonly code: string;
};

type LangType = Readonly<Record<LanguageCode, CodeSnippet>>;

export const languages: ReadonlyArray<LanguageCode> = ['c++', 'js', 'java', 'python'];

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
      uuid: 'basic-testone',
      language: 'js',
      code: lang['js'].code,
    },
    'Hello C++': {
      uuid: 'basic-testwo',
      language: 'c++',
      code: lang['c++'].code,
    },
    'Hello Python': {
      uuid: 'basic-testwo',
      language: 'python',
      code: lang['python'].code,
    },
    'Hello Java': {
      uuid: 'basic-testwo',
      language: 'java',
      code: lang['java'].code,
    },
  }
};





