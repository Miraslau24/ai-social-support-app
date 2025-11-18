import { type FC, useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

const TypeWriter: FC<TypewriterTextProps> = ({ text, speed = 100 }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const allLines = text.split('\n');

  useEffect(() => {
    setDisplayedLines([]);

    allLines.forEach((line, index) => {
      setTimeout(
        () => {
          setDisplayedLines((prev) => [...prev, line]);
        },
        index * speed * 5
      );
    });
  }, [text, speed]);
  return (
    <pre className="text-sm text-slate-700 font-sans whitespace-pre-wrap break-words">
      {displayedLines.join('\n')}
    </pre>
  );
};

export default TypeWriter;
