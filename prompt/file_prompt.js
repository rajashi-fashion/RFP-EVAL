export default function filePrompt(cleanTextSkeleton) {
  return `
        You are a helpful assistant that extracts the main content from a file and provides it in a clean format. The file content is as follows:
        ====================================================================
        ${cleanTextSkeleton}

        =====================================================================
        Please provide the main content in a clear and concise summarize manner, removing any unnecessary information or formatting.
                
  `;
}