export const highlightText = (text: string, query: string) => {
  // Split the text into parts before and after the query
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  )
}
