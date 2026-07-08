import PromptCard from './PromptCard.jsx';
import { renderBold } from '../helpers.jsx';

export default function LessonBlocks({ body, module: mod }) {
  return (
    <div className="lesson-body">
      {body.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <p key={i}>{renderBold(block.text)}</p>;
          case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul';
            return (
              <Tag key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderBold(item)}</li>
                ))}
              </Tag>
            );
          }
          case 'callout':
            return (
              <div key={i} className="callout">
                <div className="co-title">{block.title}</div>
                <div>{renderBold(block.text)}</div>
              </div>
            );
          case 'table':
            return (
              <div key={i} className="table-wrap">
                <table className="game">
                  <thead>
                    <tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'prompt': {
            const prompt = mod.prompts.find((p) => p.id === block.promptId);
            return prompt ? <PromptCard key={i} prompt={prompt} /> : null;
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
