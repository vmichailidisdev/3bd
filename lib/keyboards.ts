import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Keyboard } from '../types/keyboard';
import { remark } from 'remark';
import html from 'remark-html';

const keyboardsDirectory = path.join(process.cwd(), 'keyboards');

export async function getSortedKeyboardData() {
  const fileNames = fs.readdirSync(keyboardsDirectory);
  const allKeyboardData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md/, '');
      const fullPath = path.join(keyboardsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf-8');
      const matterResult = matter(fileContents);
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();
      return {
        id,
        ...matterResult.data,
        contentHtml,
      } as Keyboard;
    })
  );
  return allKeyboardData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllKeyboardsIds() {
  const fileNames = fs.readdirSync(keyboardsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md/, ''),
    },
  }));
}

export async function getKeyboardData(id: string) {
  const fullPath = path.join(keyboardsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    ...matterResult.data,
    contentHtml,
  } as Keyboard;
}
