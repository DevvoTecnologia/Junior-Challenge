import React from 'react';
import { StoresContext, StoresProps } from '../../stores';

export const useStore = (): StoresProps => React.useContext(StoresContext)