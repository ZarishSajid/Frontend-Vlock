import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const InjectMassage = props => <FormattedMessage {...props} />;

export default injectIntl(InjectMassage, {
    withRef: false
});

// const getToken = () => {
//   return  localStorage.getItem('token');
// }

// module.exports = {getToken}