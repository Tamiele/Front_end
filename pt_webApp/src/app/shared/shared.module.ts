import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SidebarPtComponent } from '../home-pt/sidebar-pt/sidebar-pt.component';
import { ModalComponent } from '../modal/modal.component';
import { SurfaceCardComponent } from './components/surface-card/surface-card.component';
import { CardMetricComponent } from './components/card-metric/card-metric.component';
import { ProfilePanelComponent } from './components/profile-panel/profile-panel.component';
import { ToastStackComponent } from './components/toast-stack/toast-stack.component';

@NgModule({
  declarations: [
    SidebarPtComponent,
    ModalComponent,
    SurfaceCardComponent,
    CardMetricComponent,
    ProfilePanelComponent,
    ToastStackComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SidebarPtComponent,
    ModalComponent,
    SurfaceCardComponent,
    CardMetricComponent,
    ProfilePanelComponent,
    ToastStackComponent,
  ],
})
export class SharedModule {}
