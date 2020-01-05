/**
 * Generates a mailto: link for use in <a> elements
 *
 * @param {String|Object} addressOrOptions a string or object hash with the
 * following entries:
 *  address {String} the email address
 *  subject {String} the emails subject
 *  body {String} the emails body in plain text
 */
export default function emailUri(addressOrOptions) {
  // This is a little destructuring magic here:
  // In case addressOrOptions is a String it gets assigned as the default to address
  const { address = addressOrOptions, subject = "", body = "" } = addressOrOptions
  return `mailto:${encodeURIComponent(address)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
