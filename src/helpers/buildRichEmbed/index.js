export const buildRichEmbed = ({
  description,
  fields,
  footer,
  hexColor,
  timestamp,
  title,
  type,
}) => {
  return {
    description,
    fields,
    footer,
    hexColor,
    timestamp,
    title,
    type,
  }
}
