/**********************************************************************
 * Copyright (C) 2024 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import type { CombinedExtensionInfoUI } from '/@/stores/all-installed-extensions';

import InstalledExtensionList from './InstalledExtensionList.svelte';

test('Expect to see each extension', async () => {
  const extension1: CombinedExtensionInfoUI = {
    type: 'pd',
    id: 'myExtensionId1',
    name: 'foo1',
    description: 'my description1',
    displayName: '',
    publisher: '',
    removable: false,
    devMode: false,
    version: 'v1.2.3',
    state: 'started',
    path: '',
    readme: '',
    icon: 'iconOfMyExtension.png',
  };

  const extension2: CombinedExtensionInfoUI = {
    type: 'pd',
    id: 'myExtensionId2',
    name: 'foo2',
    description: 'my description2',
    displayName: '',
    publisher: '',
    removable: false,
    devMode: false,
    version: 'v1.2.3',
    state: 'started',
    path: '',
    readme: '',
    icon: 'iconOfMyExtension.png',
  };
  render(InstalledExtensionList, { extensionInfos: [extension1, extension2] });

  // get first extension
  const myExtension1 = screen.getByRole('region', { name: 'myExtensionId1' });
  expect(myExtension1).toBeInTheDocument();

  // get second extension
  const myExtension2 = screen.getByRole('region', { name: 'myExtensionId2' });
  expect(myExtension2).toBeInTheDocument();
});
