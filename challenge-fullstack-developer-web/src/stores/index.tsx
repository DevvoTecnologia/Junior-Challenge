import React from 'react';
import { create } from 'mobx-persist';
import _map from 'lodash/map';
import _includes from 'lodash/includes';
import { General } from '../hooks/generalStore';

export interface StoresProps {
  general: General,
};

export const stores = {
  general: new General(),
};

const hydrate = create();

const blacklist = ["general"];

_map(stores, (store, name) => {
  if (_includes(blacklist, name)) {
    return;
  };

  hydrate(name, store);
});

export const StoresContext = React.createContext<StoresProps>(stores);