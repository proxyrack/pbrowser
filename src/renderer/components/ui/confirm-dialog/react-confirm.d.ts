/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { ComponentType } from 'react';
import 'react-confirm';

declare module 'react-confirm' {
  export function createReactTreeMounter(): Object;
  export function createMountPoint(mounter: Object): ComponentType;
  export function createConfirmationCreater(mounter: Object): typeof createConfirmation;
}
