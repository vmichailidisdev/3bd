import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const keyboardsDirectory = path.join(process.cwd(), 'keyboards');
const scriptsDirectory = path.join(process.cwd(), 'scripts');

async function createKeyboardData() {
  try {
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
        };
      })
    );
    const sortedKeyboardData = allKeyboardData.sort(
      ({ date: a }, { date: b }) => {
        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      }
    );
    fs.writeFileSync(
      path.join(scriptsDirectory, 'keyboards.json'),
      JSON.stringify(sortedKeyboardData)
    );
  } catch (error) {
    console.error(error);
  }
}

await createKeyboardData();
