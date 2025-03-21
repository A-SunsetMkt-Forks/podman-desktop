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

import type { Locator, Page } from '@playwright/test';

import { ResourcesPage } from './resources-page';

export class PodmanMachineDetails extends ResourcesPage {
  readonly podmanMachineName: Locator;
  readonly podmanMachineStatus: Locator;
  readonly podmanMachineConnectionActions: Locator;
  readonly podmanMachineStartButton: Locator;
  readonly podmanMachineRestartButton: Locator;
  readonly podmanMachineStopButton: Locator;
  readonly podmanMachineDeleteButton: Locator;

  readonly tabs: Locator;
  readonly summaryTab: Locator;
  readonly logsTab: Locator;
  readonly terminalTab: Locator;
  readonly tabContent: Locator;
  readonly terminalInput: Locator;
  readonly terminalContent: Locator;

  constructor(page: Page, podmanMachineName: string) {
    super(page);
    this.podmanMachineName = page.getByRole('heading', { name: podmanMachineName });
    this.podmanMachineStatus = page.getByLabel('Connection Status Label');
    this.podmanMachineConnectionActions = page.getByRole('group', { name: 'Connection Actions' });
    this.podmanMachineStartButton = this.podmanMachineConnectionActions.getByRole('button', {
      name: 'Start',
      exact: true,
    });
    this.podmanMachineRestartButton = this.podmanMachineConnectionActions.getByRole('button', { name: 'Restart' });
    this.podmanMachineStopButton = this.podmanMachineConnectionActions.getByRole('button', { name: 'Stop' });
    this.podmanMachineDeleteButton = this.podmanMachineConnectionActions.getByRole('button', { name: 'Delete' });

    this.tabs = page.getByRole('region', { name: 'Tabs' });
    this.summaryTab = this.tabs.getByText('Summary');
    this.logsTab = this.tabs.getByText('Logs');
    this.terminalTab = this.tabs.getByText('Terminal', { exact: true });
    this.tabContent = page.getByRole('region', { name: 'Tab Content' });
    this.terminalInput = this.tabContent.getByLabel('Terminal input');
    this.terminalContent = this.tabContent.locator('.xterm-rows');
  }
}
