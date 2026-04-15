import { useMemo } from 'react';
import styles from './Pseudocode.module.css';

export interface PseudocodeProps {
  lines: string[];
  currentLine: number;
  algorithmName: string;
}

function highlightSyntax(line: string): React.ReactNode {
  const keywords = /\b(procedure|function|for|while|if|else|then|end|return|to|do|not|in|and|or)\b/gi;
  const procedures = /\b(bubbleSort|selectionSort|insertionSort|mergeSort|quickSort|heapSort|merge|partition|heapify|buildMaxHeap)\b/gi;
  const variables = /\b(A|array|n|i|j|key|left|right|low|high|mid|pivot|swapped|minIdx|largest|size|l|r|k|L|R)\b/g;
  const comments = /\b(starting|comparing|swapping|complete|moving|placing|found|inserting|dividing|sorting|heapifying|building|copying|remaining|pivoting)\b/gi;

  if (line.trim() === '') {
    return '\u00A0';
  }

  let result = line;

  result = result.replace(
    /(["'])(?:(?=(\\?))\2.)*?\1/g,
    '<span class="' + styles.variable + '">$&</span>'
  );

  result = result.replace(procedures, (match) => 
    `<span class="${styles.procedure}">${match}</span>`
  );

  result = result.replace(keywords, (match) => 
    `<span class="${styles.keyword}">${match}</span>`
  );

  result = result.replace(variables, (match) => 
    `<span class="${styles.variable}">${match}</span>`
  );

  result = result.replace(comments, (match) => 
    `<span class="${styles.comment}">${match}</span>`
  );

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

export function Pseudocode({ lines, currentLine, algorithmName }: PseudocodeProps) {
  const codeLines = useMemo(() => {
    if (lines.length === 0) {
      return [
        { number: 1, code: 'No algorithm selected', highlighted: false },
      ];
    }
    return lines.map((line, index) => ({
      number: index + 1,
      code: line,
      highlighted: index === currentLine,
    }));
  }, [lines, currentLine]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Pseudocode</h3>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          {algorithmName}
        </span>
      </div>
      <div className={styles.body}>
        <pre className={styles.code}>
          {codeLines.map((line) => (
            <div
              key={line.number}
              className={`${styles.line} ${line.highlighted ? styles.highlighted : ''}`}
            >
              <span className={styles.lineNumber}>{line.number}</span>
              <span className={styles.lineCode}>
                {highlightSyntax(line.code)}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
