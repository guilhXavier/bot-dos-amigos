export const buildRichEmbed = ({
  description,
  fields,
  footer,
  hexColor,
  title,
  type,
}) => {
  return {
    description,
    fields,
    footer,
    hexColor,
    timestamp: new Date(),
    title,
    type,
  }
}
