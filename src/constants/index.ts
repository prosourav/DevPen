import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubLight } from "@uiw/codemirror-theme-github";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import uuid from "short-uuid";

export type LanguageCode = typeof languages[number];

export type CodeSnippet = {
  readonly code: string;
};

export type LangType = Record<langT, CodeSnippet>;

type IconClasses = {
  [key: string]: string;
};

export const languages = ['c++', 'js', 'java', 'python'];
export type langT = 'python' | 'c++' | 'java' | 'js';


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
};


export const initialData = {
  Basics: {
    'Hello JS': {
      uuid: 'Basics_Hello JS',
      id: uuid.generate(),
      language: 'js',
      code: lang['js'].code,
    },
    'Hello C++': {
      uuid: 'Basics_Hello C++',
      id: uuid.generate(),
      language: 'c++',
      code: lang['c++'].code,
    },
    'Hello Python': {
      uuid: 'Basics_Hello Python',
      id: uuid.generate(),
      language: 'python',
      code: lang['python'].code,
    },
    'Hello Java': {
      uuid: 'Basics_Hello Java',
      id: uuid.generate(),
      language: 'java',
      code: lang['java'].code,
    },
  }
};

export const iconClasses: IconClasses = {
  python: 'devicon-python-plain colored lan-icon',
  java: 'devicon-java-plain colored lan-icon',
  js: 'devicon-javascript-plain colored lan-icon',
  'c++': 'devicon-cplusplus-plain colored lan-icon',
};

export const languageCode = {
  "c++": 54,
  java: 62,
  js: 93,
  python: 92
};

export const getLanguageExtension = (language: LanguageCode) => {
  switch (language) {
    case 'python':
      return python();
    case 'c++':
      return cpp();
    case 'java':
      return java();
    case 'js':
      return javascript();
    default:
      return javascript();
  }
};

export type theme = 'light' | 'dark' | 'github-light' | 'dracula' |  'vs-dark';

export const getTheme = (theme: theme) => {
  switch (theme) {
    case 'vs-dark':
      return vscodeDark;
    case 'github-light':
      return githubLight;
    case 'dark':
      return 'dark';
    case 'dracula':
      return dracula;
    default:
      return 'light';
  }
};

export const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'Dracula', value: 'dracula' },
  { name: 'VS-Code Dark', value: 'vs-dark' },
  { name: 'GitHub Light', value: 'github-light' }
]

export const languageToExtension = {
  js: ".js",
  java: ".java",
  "c++": ".cpp",
  python: ".py",
};

// import axios, { Axios, AxiosResponse } from "axios";
// // const code = `
// // public class Main {

// //     public static void main(String[] args) {
// //         printPrimeNumbers(1, 20);
// //     }

// //     public static void printPrimeNumbers(int start, int end) {
// //         for (int i = start; i <= end; i++) {
// //             if (isPrime(i)) {
// //                 System.out.print(i + " ");
// //             }
// //         }
// //         System.out.println(); // To move to the next line after printing all prime numbers
// //     }

// //     public static boolean isPrime(int number) {
// //         if (number <= 1) {
// //             return false;
// //         }
// //         for (int i = 2; i <= Math.sqrt(number); i++) {
// //             if (number % i == 0) {
// //                 return false;
// //             }
// //         }
// //         return true;
// //     }
// // }


// // dynamic code

// // #include <iostream>
// // using namespace std;
// // int main(){
// //     int a, b;
// //   cin >> a >> b;
// //   cout << 10 * a + b * 5 << endl;
// //   return 0;
// // }