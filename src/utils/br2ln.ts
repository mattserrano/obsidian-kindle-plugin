export const br2ln = (html: string | null | undefined): string | null | undefined => {
  return html ? html.replace(/<br\s*[/]?>/gi, '\n') : html;
};
