function truncateRelativeToWidthElement(s: string, idRelativeElement: string): string {
    let width = document.getElementById(idRelativeElement)?.offsetWidth;
    if (width) {
      let width_characters = Math.ceil(width / 8);
      if (s.length <= width_characters) return s;
      return `${s.slice(0, width_characters - 3)}...`;
    }
    return s;
}

export { truncateRelativeToWidthElement }