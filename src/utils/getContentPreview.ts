export const MAX_CONTENT_LENGTH = 100;
export const getContentPreview = (content: string, isExpanded: boolean) =>
  isExpanded ? content : content.slice(0, MAX_CONTENT_LENGTH) + (content.length > MAX_CONTENT_LENGTH ? '...' : '');
