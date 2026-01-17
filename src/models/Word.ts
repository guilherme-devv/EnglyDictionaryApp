import { Phonetic } from './Phonetic';
import { Meaning } from './Meaning';

export interface Word {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  meanings: Meaning[];
  origin?: string;
}
