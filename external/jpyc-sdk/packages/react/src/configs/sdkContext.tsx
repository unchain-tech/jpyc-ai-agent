import { createContext } from 'react';

import type { JpycSdkContext } from '../utils';

export const SdkContext = createContext<JpycSdkContext | undefined>(undefined);
