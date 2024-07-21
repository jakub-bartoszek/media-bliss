import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

export const metadata = {
 title: "Terms of Service"
};

async function getTermsOfServiceContent() {
 const filePath = path.join(
  process.cwd(),
  "public",
  "terms-of-service.md"
 );
 const fileContents = fs.readFileSync(filePath, "utf8");
 const processedContent = await remark()
  .use(html)
  .process(fileContents);
 return processedContent.toString();
}

export default async function TermsOfServicePage() {
 const contentHtml = await getTermsOfServiceContent();

 return (
  <div className="w-full pt-24">
   <div className="prose p-4">
    <h1>Terms of Service</h1>
    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
   </div>
  </div>
 );
}
