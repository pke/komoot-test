import React from "react"
import PropTypes from "prop-types"

import useDialog from "../../hooks/useDialog"
import PrivacyPolicyDialog from "./PrivacyPolicyDialog"
import Link from "../Link"

export default function PrivacyPolicyLink({ clean, ...props }) {
  const [ visible, toggle, done ] = useDialog(clean)
  return (
    <>
      <Link href="#" onClick={toggle} {...props}>Privacy Policy</Link>
      { visible && <PrivacyPolicyDialog done={done}/> }
    </>
  )
}
PrivacyPolicyLink.propTypes = {
  clean: PropTypes.func.isRequired,
}
