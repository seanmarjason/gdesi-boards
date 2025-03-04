import * as React from 'react';
import App from './app'

import { auth } from './auth';

export default async function MarketingPage(props) {
  let session = await auth();
  
  return (
    <App session={ session }/>
  );
}
