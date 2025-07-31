export interface TextStats {
  characters: number
  words: number
  lines: number
}

export interface Difference {
  type: 'added' | 'removed' | 'unchanged'
  text: string
}
